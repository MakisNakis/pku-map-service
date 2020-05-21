import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import TableComponent from './selfComponents/TableComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";




class App extends React.Component {
    render() {
        const data = [
            ['Alexander', 345345, 887423],
            ['Paul', 2347, 76323],
            ['Larisa', 745, 54234],
        ];

        return (
            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent/>
                {/*<TableComponent data = {data}/>*/}
            </div>
        )
    }
}


export default App;