import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import TableComponent from './selfComponents/TableComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";


class App extends React.Component {

    state = {
        show: false,        //показать таблицу
        hide: undefined
    }

    gettingNamePKU = (e) => {
        // e.preventDefault();
        console.log(e.target.options.title);
        const name = e.target.options.title;


        if (name) {
            this.setState({
                show: true,
                hide: false
            });
        } else {
            this.setState({
                show: false,
                hide: "Нажмите на ПКУ для вывода таблицы" // TODO не выводится надпись про ПКУ
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
                />

            </div>
        )
    }
}


export default App;