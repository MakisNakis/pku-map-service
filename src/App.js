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
            // authorisation: true,
            show: false,        //показать таблицу
            hide: "Нажмите на ПКУ для вывода таблицы",
            idPKU: undefined,
            // depName: "Отчеты",
            depName: "ПТО",
            // typeTable: "Отчеты1",
            typeTable: "ПТО1",
            markerName: undefined,
            rootPriv: "Отчеты",
            // стейты для авторизации
            authorisation: false,
            authorisationErr: false,
            incorrectUser: false,
            userId: undefined,
            userRole: undefined,
            userName: undefined
        }
        this.url = window.location.href;
    }

    async getUserIdByLogPass(apiRoute, login, pass) { // функция для получения id пользователя
        // console.log(login);
        // console.log(pass);
        const userData = {login: login, password: pass}
        // console.log(userData);
        await fetch(`http://localhost:5000/${apiRoute}`, {
            // await fetch('http://192.168.1.116:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            // credentials: 'same-origin',
            body: JSON.stringify(userData),
            // cache: "no-cache",
        }).then(results => {
            // console.log(results);
            return results.json();
        }).then(data => {
            // console.log(data.rows[0].f_s_userid_logpas);
            if (data.rows[0].f_s_userid_logpas !== 0){
                this.setState({incorrectUser: false})
                this.setState({authorisation: true})
                this.setState({userId: data.rows[0].f_s_userid_logpas})
                console.log("Жабка в очках")
                this.getUserRoleById(apiRoute, data.rows[0].f_s_userid_logpas)
                this.getUserNameById(apiRoute, data.rows[0].f_s_userid_logpas)
            } else this.setState({incorrectUser:true})
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}`);
        });
    }

    async getUserRoleById(apiRoute, userId) { // функция для получения номера роли пользователя
        // console.log(userData);
        const userIdJson = {userId: userId}
        await fetch(`http://localhost:5000/${apiRoute}/userRole`, {
            // await fetch('http://192.168.1.116:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            // credentials: 'same-origin',
            body: JSON.stringify(userIdJson),
            // cache: "no-cache",
        }).then(results => {
            // console.log(results);
            return results.json();
        }).then(data => {
            console.log(data.rows[0].f_s_roleid_userid);
            this.setState({userRole: data.rows[0].f_s_roleid_userid})
            switch (this.state.userRole) {
                case 1:
                    this.setState({depName: "Отчеты"});
                    this.setState({typeTable: "Отчеты1"});
                    break;
                case 2:
                    this.setState({depName: "ОМТС"});
                    this.setState({typeTable: "ОМТС"});
                    break;
                case 3:
                    this.setState({depName: "ПТО"});
                    this.setState({typeTable: "ПТО1"});
                    break;
                case 4:
                    this.setState({depName: "Монтажники"});
                    this.setState({typeTable: "Монтажники1"});
                    break;
                default:
                    break;
            }
            // console.log(data);
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}/userRole`);
        });
    }

    async getUserNameById(apiRoute, userId) { // функция для получения номера роли пользователя
        const userIdJson = {userId: userId}
        await fetch(`http://localhost:5000/${apiRoute}/userName`, {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            // credentials: 'same-origin',
            body: JSON.stringify(userIdJson),
            // cache: "no-cache",
        }).then(results => {
            // console.log(results);
            return results.json();
        }).then(data => {
            console.log(data.rows[0].f_s_username_userid);
            this.setState({userName: data.rows[0].f_s_username_userid})
            // this.setState()
            // console.log(data);
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}/userName`);
        });
    }

    async checkLoginPass(login, pass) {
        this.getUserIdByLogPass('api/auth', login, pass);
    }


    gettingPersonName = /*async*/ (e) => {
        e.preventDefault();
        const login = e.target.elements.loginPerson.value;
        const password = e.target.elements.passwordPerson.value;
        return this.checkLoginPass(login, password)
        // console.log(login);
        // console.log(password);

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
                    incorrectUser={this.state.incorrectUser}
                />}
                {this.state.authorisation &&
                <div>
                    <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                    <MapComponent namePKU={this.gettingNamePKU}/>
                    <div id="start"></div>
                    <h2>Вы вошли как пользователь {this.state.userName}</h2>
                    {this.state.userRole === 1 && <DepartmentsComponent
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
                    userRole={this.state.userRole}
                    userName={this.state.userName}
                    />
                </div>}

            </div>
        )
    }
}


export default App;