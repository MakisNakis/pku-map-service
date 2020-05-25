import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import TableComponent from './selfComponents/TableComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";


class App extends React.Component {
    constructor() {

        super();

        this.state = {
            show: false,        //показать таблицу
            hide: undefined,
            idPKU: undefined,
        }
    }

    gettingNamePKU = (e) => {
        // e.preventDefault();
        console.log(e.target.options.title);
        const id = e.target.options.title;


        if (id) {
            this.setState({
                show: true,
                hide: false,
                idPKU: id
            });
        } else {
            this.setState({
                show: false,
                hide: "Нажмите на ПКУ для вывода таблицы",
                idPKU: undefined
            });
        }
    }

    render() {
        return (
            <div>
                <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                <MapComponent namePKU={this.gettingNamePKU}/>
                <TableComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                />

            </div>
        )
    }
}


export default App;