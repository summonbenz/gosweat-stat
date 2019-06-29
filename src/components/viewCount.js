import React from 'react';
import firebase from "./Firebase";
import CountUp from 'react-countup';
import img from '../images/bgload.gif';
import sprite from '../images/sprite.png';

function timestampToString(unix_timestamp){
    unix_timestamp *= 1000
    if(unix_timestamp){
        Number.prototype.padLeft = function(base,chr){
          var len = (String(base || 10).length - String(this).length)+1;
          return len > 0? new Array(len).join(chr || '0')+this : this;
        }
        var d = new Date(unix_timestamp),
        dformat = [ d.getDate().padLeft(),
                    (d.getMonth()+1).padLeft(),
                     d.getFullYear()].join('/')+
                  ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');
        return dformat;
    }
}

class viewCount extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('youtube').doc('1k9uvhTw9Fc').collection('dataList');
        this.unsubscribe = null;
        this.state = {
            view_count: 0,
            view_count_old: 0,
            created_at: null,
            percent: 10,
        };
    }
    onCollectionUpdate = (querySnapshot) => {
        const tables = [];
        querySnapshot.forEach((doc) => {
            var goal = 4000000
            var calper = Math.floor(100*doc.data().data.viewCount/goal)
            if(calper > 10){
                this.setState({
                    percent: calper
                })
            }
            this.setState({
                view_count_old: this.state.view_count,
                view_count: doc.data().data.viewCount,
                created_at: timestampToString(doc.data().created_at.seconds)
            });
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.orderBy("created_at", "desc").limit(1).onSnapshot(this.onCollectionUpdate);
    }
    render() {
        return (
            <div>
                <div id="view">
                    <CountUp 
                        start={this.state.view_count_old}
                        end={this.state.view_count}
                    />
                </div>
                <div
                className="sub-text">
                    Views
                </div>
                <div className="progress-box">
                    <div className="progress-bar">
                        <div className="percent"
                            style={{
                                width: this.state.percent+ '%',
                                backgroundColor: "#f20088",
                                backgroundImage: `url(${img})` }}
                        >
                        <div className="mook"
                        style={{ backgroundImage: `url(${sprite})`}}
                        ></div>
                        </div>
                    </div>
                    <div
                    class="progress-footer">
                        <div
                        className="bubble">
                        4M
                        </div>
                    </div>
                </div>
                <div
                className="info">
                    ข้อมูลอัปเดทล่าสุดเมื่อ : {this.state.created_at}
                </div>
            </div>
            );
        }

}
export default viewCount