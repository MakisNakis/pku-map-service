import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";
import {Icon} from "leaflet";


class App extends React.Component {
    constructor() {

        super();

        this.state = {
            show: false,        //показать таблицу
            hide: undefined,
            idPKU: undefined,
            // routeId: undefined,
            depName: "Отчеты",
            markerName: undefined
        }
    }

    gettingNamePKU = (e) => {
        // e.preventDefault();
        console.log(e.target.options.name);
        const id = e.target.options.title;
        const name = e.target.options.name;

        if (id) {
            this.setState({
                show: true,
                hide: false,
                idPKU: id,
                depName: "Отчеты",
                markerName: name
            });

        } else {
            this.setState({
                show: false,
                hide: "Нажмите на ПКУ для вывода таблицы",
                idPKU: undefined,
                markerName: name

            });
        }
    };


    onClickDep = (e) => {
        // console.log(e.target.title);
        // console.log(e.target);
        const buttonName = e.target.title;
        console.log(e.target);

        switch (buttonName) {
            case "ОМТС":
                this.setState({depName: buttonName});
                break;
            case "Монтажники":
                this.setState({depName: buttonName});
                break;
            case "ПТО":
                this.setState({depName: buttonName});
                break;
            case "Отчеты":
                this.setState({depName: buttonName});
                break;
            default:
                break;
        }
    };


    render() {
        return (
            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent namePKU={this.gettingNamePKU}/>
                <DepartmentsComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                    depNameFunc={this.onClickDep}
                    depName={this.state.depName}
                />
                <TableComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                    depName={this.state.depName}
                    markerName={this.state.markerName}
                />

            </div>
        )
    }
}


export default App;