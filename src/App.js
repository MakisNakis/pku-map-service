import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';
import AuthorisationComponent from './selfComponents/AuthorisationComponent';
import TypeTableComponent from './selfComponents/TypeTableComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";
import {Icon} from "leaflet";


class App extends React.Component {
    constructor() {

        super();

        this.state = {
            authorisation: false,
            authorisationErr: false,
            show: false,        //показать таблицу
            hide: "Нажмите на ПКУ для вывода таблицы",
            idPKU: undefined,
            depName: "Отчеты",
            typeTable: "Отчеты1",
            markerName: undefined,
            rootPriv: "Отчеты",
        }
    }

    gettingPersonName = /*async*/ (e) => {
        e.preventDefault();
        const login = e.target.elements.loginPerson.value;
        const password = e.target.elements.passwordPerson.value;

        console.log(login);
        console.log(password);

        if (login === "ОМТС" && password === "ОМТС")
        {
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "ОМТС",
                rootPriv: "ОМТС"
            });
        }else if(login === "Монтажники" && password === "Монтажники"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Монтажники",
                rootPriv: "Монтажники"
            });
        }else if(login === "ПТО" && password === "ПТО"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "ПТО",
                rootPriv: "ПТО"
            });
        }else if(login === "Отчеты" && password === "Отчеты"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Отчеты",
                rootPriv: "Отчеты"
        });
        }else {
            this.setState({
                authorisation: false,
                authorisationErr: "Неправильный логин или пароль",
            });
        }
    }

    gettingNamePKU = (e) => {
        // e.preventDefault();
        console.log(e.target.options.name);
        const id = e.target.options.title;
        const name = e.target.options.name;
        console.log();
        if (id) {
            this.setState({
                show: true,
                hide: false,
                idPKU: id,
                // depName: "Отчеты",
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

        this.setState({depName: buttonName});

        switch (buttonName) {
            case "ОМТС":
                this.setState({typeTable: "ОМТС"});
                break;
            case "Монтажники":
                this.setState({typeTable: "Монтажники1"});
                break;
            case "ПТО":
                this.setState({typeTable: "ПТО1"});
                break;
            case "Отчеты":
                this.setState({typeTable: "Отчеты1"});
                break;
            default:
                break;
        }
    };


    onClickTypeTable = (e) => {
        // console.log(e.target.title);
        // console.log(e.target);
        const buttonName = e.target.title;
        console.log(e.target);
        this.setState({typeTable: buttonName});

    };


    render() {
        return (
            <div>
                {!this.state.authorisation && <AuthorisationComponent
                    getPersonName={this.gettingPersonName}
                    authErr={this.state.authorisationErr}
                />}
                {this.state.authorisation &&
                <div>
                    <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                    <MapComponent namePKU={this.gettingNamePKU}/>
                    {this.state.rootPriv === "Отчеты" && <DepartmentsComponent // выводим вкладки таблиц других отделов для суперпользователя
                        show={this.state.show}
                        hide={this.state.hide}
                        idPKU={this.state.idPKU}
                        depNameFunc={this.onClickDep}
                        depName={this.state.depName}
                    />
                    }
                    <TypeTableComponent
                        show={this.state.show}
                        hide={this.state.hide}
                        idPKU={this.state.idPKU}
                        typeTableFunc={this.onClickTypeTable}
                        depName={this.state.depName}
                        typeTable={this.state.typeTable}
                    />
                    {this.state.idPKU && (this.state.typeTable === "Монтажники1" || this.state.typeTable === "ПТО1") && <p className="Table-header"><h2 align="center">Перечень работ на {this.state.markerName} </h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "Монтажники2" || this.state.typeTable === "ПТО2") && <p className="Table-header"><h2 align="center">Перечень оборудования на {this.state.markerName} </h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "ОМТС" || this.state.typeTable === "Отчеты1" || this.state.typeTable === "Отчеты2") && <p className="Table-header"><h2 align="center">Маршрут Альметьевск - Карабаш</h2></p>}
                    <TableComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                    depName={this.state.depName}
                    typeTable={this.state.typeTable}
                    markerName={this.state.markerName}
                    />
                </div>}

            </div>
        )
    }
}


export default App;