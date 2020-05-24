import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import TableComponent from './selfComponents/TableComponent';
// import PkuDataFromServer from './selfComponents/PkuDataFromServer';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            data2: [
                {id: 3, name: "Peter", lastName: "Griffin"},
                {id: 4, name: "Jack", lastName: "Sparrow"},
                {id: 5, name: "Steve", lastName: "Smith"}]
        };

    }


    loadData() {
        // console.log(this.state.data)
        fetch('/api/pkuDataServer').then(results => {
            return results.json()
        }).then(data => {
            this.setState({data: data.rows});
            console.log(this.state.data)

        }).catch(() => {
            alert('Ошибка!');
        });
    }


    componentWillMount() {
      this.loadData();

    }

    // async fetchPkuData() {
    //     // запрашиваем JSON с данными пользователя
    //     let response = await fetch('/api/pkuDataServer');
    //     let user = await response.json();
    //     this.setState({pkuData: user.rows});
    //
    //     // this.huy(user)
    //     // this.state.pkuData = user;
    //     // return user;
    // }


    render() {
        // console.log(this.state.data)

        return (

            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent dataServer={this.state.data}/>


                                    {/*<table className="table">*/}
                                    {/*    <thead>*/}
                                    {/*    <tr>*/}
                                    {/*        <th>*/}
                                    {/*            Id*/}
                                    {/*        </th>*/}
                                    {/*        <th>*/}
                                    {/*            Lat*/}
                                    {/*        </th>*/}
                                    {/*        <th>*/}
                                    {/*            Long*/}
                                    {/*        </th>*/}

                                    {/*    </tr>*/}
                                    {/*    </thead>*/}
                                    {/*    <tbody>*/}
                                    {/*    /!*{this.state.data[0].map(item => {*!/*/}
                                    {/*    */}
                                    {/*    /!*    console.log(this.state.data[0])*!/*/}
                                    {/*    /!*    return (*!/*/}
                                    {/*    /!*        <tr key={item.ID}>*!/*/}
                                    {/*    /!*            <td>{item.ID}</td>*!/*/}
                                    {/*    /!*            <td>{item.Latitude}</td>*!/*/}
                                    {/*    /!*            <td>{item.Longitude}</td>*!/*/}
                                    {/*    /!*            /!*<td dangerouslySetInnerHTML={{__html: item.Ban ? '<input checked="checked" class="check-box" disabled="disabled" type="checkbox">' : '<input class="check-box" disabled="disabled" type="checkbox">'}}></td>*!/*!/*/}
                                    {/*    /!*        </tr>*!/*/}
                                    {/*    /!*    );*!/*/}
                                    {/*    /!*})*!/*/}
                                    {/*    /!*}*!/*/}
                                    {/*    </tbody>*/}
                                    {/*</table>*/}


                {/*<MapComponent dataServer={this.state.data}/>*/}
                {/*<TableComponent/>*/}
                {/*<PkuDataFromServer />*/}
            </div>
        )
    }
}


export default App;