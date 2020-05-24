import React, {Component} from 'react';
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
import {Link} from "react-scroll";



class MapComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 5,
            minZoom:4,
            radius: 0,
        };

        this.pkuMarkerIcon = {
            iconUrl: '/markers/rgM.png',
            iconSize: [30, 50],
            shadowSize: [15, 15],
            iconAnchor: [15, 50],
            popupAnchor: [0, 0]
        }

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


    handleClick = (e) => {
        console.log(e.target.options.title);
    }


    renderMarkersLayer(pkuData) {
        var result = [];
        for (var i = 0; i < pkuData.default.pkuInfo.length; i++) {
            result.push(

                    <Marker key={i}
                            position={[pkuData.default.pkuInfo[i].Latitude, pkuData.default.pkuInfo[i].Longitude]}
                            icon={this.setMarkerIcon(pkuData.default.pkuInfo[i].RouteID)}
                            title={pkuData.default.pkuInfo[i].City}
                            onClick={this.handleClick}
                    >
                        <Popup>
                            <div>
                                <Link
                                    to="TableComp"
                                    spy={true}
                                    smooth={true}
                                    duration= {500}

                                >
                                    <h2>{pkuData.default.pkuInfo[i].City}</h2>*
                                    <h3>Зона обслуживания УС: {pkuData.default.pkuInfo[i].Zone}</h3>
                                </Link>


                            </div>
                        </Popup>
                    </Marker>
            );
        }
        return result;
    }

    // renderSecond() {
    //     return <MyLayer latlng={[1, 10]} radius={this.state.radius}/>
    // }

    render() {
        return (
            <div>
                <LeafletMap center={[54.730922, 55.962198]} zoom={this.state.zoom} minZoom={this.state.minZoom} >
                    <LayersControl position='topright'>

                        <LayersControl.BaseLayer checked name="Гибрид">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.Overlay checked name="Карабаш">
                            <LayerGroup name="pkuMarkersKarabash">
                                {this.renderMarkersLayer(pkuDataKarabash)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                        <LayersControl.Overlay checked name="Уфа">
                            <LayerGroup name="pkuMarkersUfa">
                                {this.renderMarkersLayer(pkuDataUfa)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                    </LayersControl>
                </LeafletMap>
            </div>
        );
    }
}

export default MapComponent

