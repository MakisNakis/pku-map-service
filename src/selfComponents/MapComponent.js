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
import './css/MapComponent.css';


class MapComponent extends Component {

    constructor() {
        super();

        this.state = {
            zoom: 9,
            minZoom: 6,
            radius: 0,
            // firstRouteApi: '/api/pkuDataServerFirstRoute',
            // secondRouteApi: '/api/pkuDataServerSecondRoute',
            // thirdRouteApi: '/api/pkuDataServerThirdRoute',
            pkuDataFirstRoute: [],
            pkuDataSecondRoute: [],
            pkuDataThirdRoute: [],
            currentSelectedRouteId: 2 // по умолчанию при первой отрисовке таблицы будет выводиться информация о маршруте Альметьевск - Карабаш
        };

        this.pkuMarkerIcon = {
            iconUrl: '/markers/rgM.png',
            iconSize: [30, 50],
            shadowSize: [15, 15],
            iconAnchor: [15, 50],
            popupAnchor: [0, -50]
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
                break

            case 2:
                await fetch('/api/pkuDataServerSecondRoute').then(results => {
                    return results.json()
                }).then(data => {
                    this.setState({pkuDataSecondRoute: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`Ошибка при извлечении информации о ${routeId}-м маршруте!`);
                });
                break

                case 3:
                await fetch('/api/pkuDataServerThirdRoute').then(results => {
                    return results.json()
                }).then(data => {
                    this.setState({pkuDataThirdRoute: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`Ошибка при извлечении информации о ${routeId}-м маршруте!`);
                });
                break
            default:
                console.log(`Маршрут с номером "${routeId}" отсутствует`);
                break

        }

    }


    componentWillMount() {
        // this.loadData(1);
        this.loadData(2);
        this.loadData(3);
    }


    setMarkerIcon(routeId) { // свитч для выбора иконки маркера в зависимости от маршрута
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

        // if (routeId === 1) {
        //     pkuData = this.state.pkuDataFirstRoute;
        // } else
        if (routeId === 2) {
            pkuData = this.state.pkuDataSecondRoute;
        } else if (routeId === 3) {
            pkuData = this.state.pkuDataThirdRoute;
        }

        // console.log(pkuData);

        // console.log(this.state.pkuDataFirstRoute);
        // console.log(this.state.pkuDataSecondRoute.length);
        // console.log(this.state.pkuDataSecondRoute);
        let result = [];
        for (let i = 0; i < pkuData.length; i++) {
            // console.log(pkuData[0].routenumber)
            result.push(
                <Marker key={i}
                        position={[pkuData[i].Latitude, pkuData[i].Longtitude]}
                        icon={this.setMarkerIcon(routeId)}
                        title={`${pkuData[i].routenumber}-й маршрут`}
                        name={pkuData[i].SubjectName}
                        onClick={(e) => this.props.namePKU(pkuData[i].SubjectID, pkuData[i].SubjectName, pkuData[i].routenumber, e)}
                >
                    <Popup>

                        <Link
                            // не настраивал
                            to="start"
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


    // pkuListGeneration(routeId) {
    //     let items = [];
    //
    //     let pkuData = undefined;
    //
    //     if (routeId === 1) {
    //         pkuData = this.state.pkuDataFirstRoute;
    //     } else if (routeId === 2) {
    //         pkuData = this.state.pkuDataSecondRoute;
    //     }
    //
    //     console.log(this.props.selectedId);
    //     for (let i = 0; i < pkuData.length; i++) {
    //
    //         if(this.props.selectedId === pkuData[i].SubjectID) {
    //             items.push(<option key={pkuData[i].SubjectID} value={pkuData[i].SubjectName} selected>{pkuData[i].SubjectName}</option>);
    //         } else {
    //             items.push(<option key={pkuData[i].SubjectID} value={pkuData[i].SubjectName}>{pkuData[i].SubjectName}</option>);
    //         }
    //     }
    //     return items;
    // }

    pkuListGeneration(routeId) {
        let items = [];
        let pkuData = undefined;

        // if (routeId === 1) {
        //     pkuData = this.state.pkuDataFirstRoute;
        // } else
        if (routeId === 2) {
            pkuData = this.state.pkuDataSecondRoute;
        } else if (routeId === 3) {
            pkuData = this.state.pkuDataThirdRoute;
        }

        // console.log(this.props.selectedId);
        for (let i = 0; i < pkuData.length; i++) {
            if (this.props.selectedId === pkuData[i].SubjectID ){
                items.push(
                    <tr>
                        <td>
                            <Link
                                // не настраивал
                                to="start"
                                spy={true}
                                smooth={true}
                                duration={500}

                            >
                                <div id={"selectedPku"}>
                                    <button
                                        className={"button8 btnPku buttonSelected"}
                                        title={pkuData[i].routenumber}
                                        name={pkuData[i].SubjectName}
                                        onClick={(e) => this.props.namePKU(pkuData[i].SubjectID, pkuData[i].SubjectName, pkuData[i].routenumber, e)

                                        }
                                    >
                                        {pkuData[i].SubjectName}
                                    </button>
                                </div>
                            </Link>
                        </td>
                    </tr>
                );
            } else {
                items.push(
                    <tr>
                        <td>
                            <button
                                className={"button8 btnPku"}
                                title={pkuData[i].SubjectID}
                                name={pkuData[i].SubjectName}
                                onClick={(e) => this.props.namePKU(pkuData[i].SubjectID, pkuData[i].SubjectName, pkuData[i].routenumber, e)}
                            >
                                {pkuData[i].SubjectName}
                            </button>
                        </td>
                    </tr>
                );
            }

        }
        return items;
    }


    render() {

        return (
            <div >
            {/*<div align="center">*/}
                <table>
                    <tr>
                        <td className={"mapComp"}>
                            <LeafletMap center={[55.030922, 53.722198]} zoom={this.state.zoom} minZoom={this.state.minZoom}>
                                <LayersControl position='topright'>

                                    <LayersControl.BaseLayer checked name="Гибрид">
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                    </LayersControl.BaseLayer>

                                    {/*<LayersControl.Overlay checked name="Уфа">*/}
                                    {/*    <LayerGroup name="pkuMarkersUfa">*/}
                                    {/*        {this.renderMarkersLayer(1)}*/}
                                    {/*    </LayerGroup>*/}
                                    {/*</LayersControl.Overlay>*/}

                                    <LayersControl.Overlay checked name="Карабаш">
                                        <LayerGroup name="pkuMarkersKarabash">
                                            {this.renderMarkersLayer(2)}
                                        </LayerGroup>
                                    </LayersControl.Overlay>

                                    <LayersControl.Overlay checked name="Башкултаево">
                                        <LayerGroup name="pkuMarkersBashkultaevo">
                                            {this.renderMarkersLayer(3)}
                                        </LayerGroup>
                                    </LayersControl.Overlay>

                                </LayersControl>
                            </LeafletMap>
                        </td>
                        <td className={"pkuListComp"}>
                            <div id={"pkuListCompDiv"}>
                                {/*<button className={"labelPkuListComp"}>Список ПКУ</button>*/}
                                {/*<select className={"select1"}>*/}
                                {/*    {this.pkuListGeneration(2)}*/}
                                {/*</select>*/}
                                <div className={"tablePkuListScroll"}>
                                    <table className={"tablePkuList"}>
                                        {this.pkuListGeneration(this.props.routeNumber)}
                                    </table>
                                </div>

                            </div>
                        </td>
                    </tr>
                </table>

            </div>
        );
    }
}

export default MapComponent
