// import React, {Component} from 'react';
//
//
// class PkuDataFromServer extends Component {
//
//     constructor() {
//         super();
//         this.state = {
//             pkuData: [{a: "df"}]
//         }
//     }
//
//     componentDidMount() {
//         fetch('/api/pkuDataServer')
//             .then(res => res.json())
//             .then(pkuDataServer => this.setState({pkuData: pkuDataServer}, () => console.log('We fetched...',
//                 pkuDataServer)))
//     }
//
//     render() {
//         return (
//             <div>
//                 {console.log(this.state.pkuData)}
//             </div>
//         );
//     }
// }
//
// export default PkuDataFromServer;
