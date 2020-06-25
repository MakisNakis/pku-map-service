import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';
import AuthorisationComponent from './selfComponents/AuthorisationComponent';

import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";
import {Icon} from "leaflet";


class App extends React.Component {
    constructor() {

        super();

        this.state = {
            authorisation: true,
            authorisationErr: false,
            show: false,        //показать таблицу
            hide: "Нажмите на ПКУ для вывода таблицы",
            idPKU: undefined,
            // routeId: undefined,
            depName: "Отчеты",
            markerName: undefined
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
            });
        }else if(login === "Монтажники" && password === "Монтажники"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Монтажники",
            });
        }else if(login === "ПТО" && password === "ПТО"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "ПТО",
            });
        }else if(login === "Отчеты" && password === "Отчеты"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Отчеты",
            });
        }else {
            this.setState({
                authorisation: false,
                authorisationErr: "Неправильный логин или пороль",
            });
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
                {!this.state.authorisation && <AuthorisationComponent
                    getPersonName={this.gettingPersonName}
                    authErr={this.state.authorisationErr}
                />}
                {this.state.authorisation &&
                <div>
                    <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                    <MapComponent namePKU={this.gettingNamePKU}/>
                    {/*{this.state.depName === "Отчеты" &&*/}
                        <DepartmentsComponent
                            show={this.state.show}
                            hide={this.state.hide}
                            idPKU={this.state.idPKU}
                            depNameFunc={this.onClickDep}
                            depName={this.state.depName}
                        />
                    {/*}*/}
                    <TableComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                    depName={this.state.depName}
                    markerName={this.state.markerName}
                    />
                </div>}

            </div>
        )
    }
}


export default App;