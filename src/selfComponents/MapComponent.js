import React, {Component} from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import {Icon} from "leaflet";
import * as pkuData from "../data/tRouteTrackPointsKarabash.json"

console.log(pkuData);

class MapComponent extends React.Component {
    render() {

        return (

            <LeafletMap center={[54.730922, 55.962198]} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {pkuData.pkuInfo.map(pku =>
                    <Marker key={pku.ID} position={[pku.Latitude, pku.Longitude]}/>)}
            </LeafletMap>
        )
    }
}

export default MapComponent;