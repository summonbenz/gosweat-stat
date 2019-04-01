import React from 'react';
import firebase from "./Firebase";

function timestampToString(unix_timestamp){
    unix_timestamp *= 1000
    if(unix_timestamp){
        Number.prototype.padLeft = function(base,chr){
          var len = (String(base || 10).length - String(this).length)+1;
          return len > 0? new Array(len).join(chr || '0')+this : this;
        }
        var d = new Date(unix_timestamp),
        dformat = [ (d.getMonth()+1).padLeft(),
                     d.getDate().padLeft(),
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
            created_at: null
        };
    }
    onCollectionUpdate = (querySnapshot) => {
        const tables = [];
        querySnapshot.forEach((doc) => {
            this.setState({
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
                    {this.state.view_count}
                </div>
                <div
                className="sub-text">
                    Views
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