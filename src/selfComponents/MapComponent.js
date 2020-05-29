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
// import * as pkuDataKarabash from "../data/tRouteTrackPointsKarabash.json"
// import * as pkuDataUfa from "../data/tRouteTrackPointsUfa.json"
import {render} from 'react-dom'
import {Link} from "react-scroll";


class MapComponent extends Component {

    constructor() {
        super();

        this.state = {
            zoom: 5,
            minZoom: 4,
            radius: 0,
            firstRouteApi: '/api/pkuDataServerFirstRoute',
            secondRouteApi: '/api/pkuDataServerSecondRoute',
            pkuDataFirstRoute: [],
            pkuDataSecondRoute: []
        };

        this.pkuMarkerIcon = {
            iconUrl: '/markers/rgM.png',
            iconSize: [30, 50],
            shadowSize: [15, 15],
            iconAnchor: [15, 50],
            popupAnchor: [0, 0]
        }

    }

    async loadData(routeId) {
        switch (routeId) {
            case 1:
                await fetch('/api/pkuDataServerFirstRoute').then(results => {
                    return results.json()
                }).then(data => {
                    this.setState({pkuDataFirstRoute: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`Ошибка при извлечении информации о ${routeId}-м маршруте!`);
                });

            case 2:
                await fetch('/api/pkuDataServerSecondRoute').then(results => {
                    return results.json()
                }).then(data => {
                    this.setState({pkuDataSecondRoute: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`Ошибка при извлечении информации о ${routeId}-м маршруте!`);
                });

            default:
                console.log(`Маршрут с номером "${routeId}" отсутствует`);

        }

        // console.log(this.state.data)

    }


    componentWillMount() {
        this.loadData(1);
        this.loadData(2);
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

    renderMarkersLayer(routeId) {
        let pkuData = undefined;

        if (routeId === 1) {
            pkuData = this.state.pkuDataFirstRoute;
        } else if (routeId === 2) {
            pkuData = this.state.pkuDataSecondRoute;
        }

        // console.log(this.state.pkuDataFirstRoute);
        // console.log(this.state.pkuDataSecondRoute.length);
        // console.log(this.state.pkuDataSecondRoute);
        let result = [];
        for (let i = 0; i < pkuData.length; i++) {
            result.push(
                <Marker key={i}
                        position={[pkuData[i].Latitude, pkuData[i].Longtitude]}
                        icon={this.setMarkerIcon(routeId)}
                        title={pkuData[i].SubjectID}
                        onClick={this.props.namePKU}
                >
                    <Popup>
                        <Link
                            // не настраивал
                            to="TableComp"
                            spy={true}
                            smooth={true}
                            duration={500}

                        >
                            {/*<h2>{pkuData.SubjectName}</h2>*/}
                            <h3> {pkuData[i].SubjectName}</h3>
                        </Link>
                    </Popup>
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

                        <LayersControl.Overlay checked name="Уфа">
                            <LayerGroup name="pkuMarkersUfa">
                                {this.renderMarkersLayer(1)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                        <LayersControl.Overlay checked name="Карабаш">
                            <LayerGroup name="pkuMarkersKarabash">
                                {this.renderMarkersLayer(2)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                    </LayersControl>
                </LeafletMap>
            </div>
        );
    }
}

export default MapComponent
