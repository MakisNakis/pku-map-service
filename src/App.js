import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
// import {Map as LeafletMap, Marker, Popup, TileLayer} from "react-leaflet";
// import {Icon} from "leaflet";

// import * as pkuData from "./data/tRouteTrackPointsKarabash.json"
// console.log(pkuData);

// class App extends Component {
//
//     render() {
//         const loadingPosition = [54.730922, 55.962198];
//
//         return (
//             <div>
//                 {/*<div className="mainHeader"> <h1>Объекты для монтажа оборудования </h1></div>*/}
//
//
//                 <Map/>
//
//
//
//
//
//             </div>
//
//         );
//     }
//
// }

export default function App() {
    return (
     <MapComponent/>

    );

}
{/*<LeafletMap center = {[54.730922, 55.962198]} zoom = {12}>*/}
{/*    <TileLayer*/}
{/*        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
{/*        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"*/}
{/*    />*/}

{/*</LeafletMap>*/}
