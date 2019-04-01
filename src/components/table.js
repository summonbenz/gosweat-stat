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
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('youtube').doc('1k9uvhTw9Fc').collection('dataList');
        this.unsubscribe = null;
        this.state = {
            tables: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const tables = [];
        querySnapshot.forEach((doc) => {
            // const { created_at } = doc.data();
            console.log(doc.data())
            tables.push({
                key: doc.id,
                // doc, // DocumentSnapshot
                data: doc.data()
                // title,
                // description,
                // created_at,
            });
        });
        console.log(tables.doc)
        this.setState({
            tables
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.orderBy("created_at", "desc").limit(500).onSnapshot(this.onCollectionUpdate);
    }
    
    render() {
        return (
            <table 
            className="table table-stripe"
            >
                <thead>
                    <tr>
                    <th>Datetime</th>
                    <th>Views</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tables.map(data =>
                    <tr>
                        <td>{ timestampToString(data.data.created_at.seconds) }</td>
                        <td>{ data.data.data.viewCount }</td>
                    </tr>
                    )}
                </tbody>
            </table>
            );
        }
   
}
export default Table