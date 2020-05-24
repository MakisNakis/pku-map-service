import React, {Component} from 'react';
// import PkuDataFromServer from './PkuDataFromServer';

import {
    Map as LeafletMap,
    Marker,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup,
    FeatureGroup,
    Circle
} from "react-leaflet";
import {Icon} from "leaflet";
import * as pkuDataKarabash from "../data/tRouteTrackPointsKarabash.json"
import * as pkuDataUfa from "../data/tRouteTrackPointsUfa.json"
import {render} from 'react-dom'




class MapComponent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            zoom: 5,
            minZoom: 4,
            radius: 0,
            pkuData: []
        };

        this.pkuMarkerIcon = {
            iconUrl: '/markers/rgM.png',
            iconSize: [30, 50],
            shadowSize: [15, 15],
            iconAnchor: [15, 50],
            popupAnchor: [0, 0]
        }

    }

    async loadData() {
        // console.log(this.state.data)
        await fetch('/api/pkuDataServer').then(results => {
            return results.json()
        }).then(data => {
            this.setState({pkuData: data.rows});
            // console.log(this.state.pkuData[0].ID)

        }).catch(() => {
            alert('Ошибка!');
        });
    }


    componentWillMount() {
        this.loadData();
    }



    setMarkerIcon(routeId) {
        switch (routeId) {
            case 1:
                this.pkuMarkerIcon.iconUrl = '/markers/redM.png';
                break;
            case 2:
                this.pkuMarkerIcon.iconUrl = '/markers/greenM.png';
                break;
            case 3:
                this.pkuMarkerIcon.iconUrl = '/markers/blueM.png';
                break;
            default:
                break;
        }
        return new Icon(this.pkuMarkerIcon)
    }


    renderMarkersLayer() {
        // console.log(this.state.pkuData[0].ID)

        // console.log(this.state.pkuData[0].Latitude);
        // console.log(this.state.pkuData);
        let pkuData = this.state.pkuData;

        var result = [];
        for (var i = 0; i < pkuData.length; i++) {
            result.push(
                <Marker key={i} position={[pkuData[i].Latitude, pkuData[i].Longitude]}
                        icon={this.setMarkerIcon(pkuData[i].RouteID)}
                >
                    {/*<Popup>*/}
                    {/*    <div>*/}
                    {/*        <h2>{pkuData.default.pkuInfo[i].City}</h2>*/}
                    {/*        <h3>Зона обслуживания УС: {pkuData.default.pkuInfo[i].Zone}</h3>*/}
                    {/*    </div>*/}
                    {/*</Popup>*/}
                </Marker>
            );
        }
        return result;
    }



    render() {

        return (
            <div>
                <LeafletMap center={[54.730922, 55.962198]} zoom={this.state.zoom} minZoom={this.state.minZoom}>
                    <LayersControl position='topright'>

                        <LayersControl.BaseLayer checked name="Гибрид">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.Overlay checked name="Карабаш">
                            <LayerGroup name="pkuMarkersKarabash">
                                {this.renderMarkersLayer()}
                            </LayerGroup>
                        </LayersControl.Overlay>

                        {/*<LayersControl.Overlay checked name="Уфа">*/}
                        {/*    <LayerGroup name="pkuMarkersUfa">*/}
                        {/*        {this.fetchPkuData}*/}
                        {/*    </LayerGroup>*/}
                        {/*</LayersControl.Overlay>*/}

                    </LayersControl>
                </LeafletMap>
            </div>
        );
    }
}

export default MapComponent

