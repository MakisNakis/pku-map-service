import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import TableComponent from './selfComponents/TableComponent';
import PkuDataFromServer from './selfComponents/pkuDataFromServer';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";




class App extends React.Component {
    render() {

        return (
            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent/>
                <TableComponent />
                <PkuDataFromServer />
            </div>
        )
    }
}


export default App;