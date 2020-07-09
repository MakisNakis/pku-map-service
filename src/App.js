import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';
import AuthorisationComponent from './selfComponents/AuthorisationComponent';
import TypeTableComponent from './selfComponents/TypeTableComponent';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";
import {Icon} from "leaflet";


// const columns = [{
//     dataField: 'id',
//     text: 'Product ID'
// }, {
//     dataField: 'name',
//     text: 'Product Name'
// }, {
//     dataField: 'price',
//     text: 'Product Price'
// }];
//
// const products = [{
//     id: 1,
//     name: "item 1",
//     price: 111
// },{
//     id: 2,
//     name: "item 2",
//     price: 222
// },{
//     id: 3,
//     name: "item 3",
//     price: 333
// },
// ]

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
                typeTable: "ОМТС",
                rootPriv: "ОМТС"
            });
        }else if(login === "Монтажники" && password === "Монтажники"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Монтажники",
                typeTable: "Монтажники1",
                rootPriv: "Монтажники"
            });
        }else if(login === "ПТО" && password === "ПТО"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "ПТО",
                typeTable: "ПТО1",
                rootPriv: "ПТО"
            });
        }else if(login === "Отчеты" && password === "Отчеты"){
            this.setState({
                authorisation: true,
                authorisationErr: false,
                depName: "Отчеты",
                typeTable: "Отчеты1",
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
        const buttonName = e.target.title;
        console.log(e.target);
        this.setState({typeTable: buttonName});
    };


    render() {
        return (
            <div>

                {/*<BootstrapTable*/}
                {/*    keyField="id"*/}
                {/*    data={ products }*/}
                {/*    columns={ columns }*/}
                {/*    cellEdit={ cellEditFactory({ mode: 'click' }) }*/}
                {/*/>*/}
                {!this.state.authorisation && <AuthorisationComponent
                    getPersonName={this.gettingPersonName}
                    authErr={this.state.authorisationErr}
                />}
                {this.state.authorisation &&
                <div>
                    <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                    <MapComponent namePKU={this.gettingNamePKU}/>
                    <div id="start"></div>
                    {this.state.rootPriv === "Отчеты" && <DepartmentsComponent
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