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



    render() {
        // console.log(this.state.data)

        return (

            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent />

                {/*<MapComponent dataServer={this.state.data}/>*/}
                {/*<TableComponent/>*/}
                {/*<PkuDataFromServer />*/}
            </div>
        )
    }
}


export default App;