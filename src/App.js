import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';
import AuthorisationComponent from './selfComponents/AuthorisationComponent';
import TypeTableComponent from './selfComponents/TypeTableComponent';
import LogoutComponent from './selfComponents/LogoutComponent';
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
            depName: "ОМТС",
            // depName: "ПТО",
            // typeTable: "Отчеты1",
            // typeTable: "ПТО1",
            typeTable: "ОМТС",
            markerName: undefined,
            rootPriv: "Отчеты",
            // стейты для авторизации
            authorisation: false,
            authorisationErr: false,
            incorrectUser: false,
            userId: undefined,
            userRole: undefined,
            userName: undefined,
            rememberMe: false
        }
        this.url = window.location.href;
        // if (localStorage.getItem('rememberMe') === 'true'){
        //     const rememberMe =  localStorage.getItem('rememberMe')
        //     const userId =  localStorage.getItem('userId')
        //     const userRole =  localStorage.getItem('userRole')
        //     const userName =  localStorage.getItem('userName')
        //     this.setState({userId, userRole, userName, rememberMe})
        //     this.setState({authorisation: true})
        // }
    }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true'
        const userId = rememberMe ? localStorage.getItem('userId') : ''
        const userRole = rememberMe ? localStorage.getItem('userRole') : ''
        const userName = rememberMe ? localStorage.getItem('userName') : ''
        if (rememberMe) this.setState({authorisation: true})
        this.setState({userId, userRole, userName, rememberMe})
        this.switchDepartment()

    }

    async getUserIdByLogPass(apiRoute, login, pass) { // функция для получения id пользователя
        // console.log(login);
        // console.log(pass);
        const userData = {login: login, password: pass}
        // console.log(userData);
        await fetch(`${this.url}${apiRoute}`, {
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

switchDepartment(){
    switch (localStorage.getItem('userRole')) {
        case '1':
            this.setState({depName: "Отчеты"});
            console.log('1111111')
            this.setState({typeTable: "Отчеты1"});
            break;
        case '2':
            this.setState({depName: "ОМТС"});
            console.log('22222222')
            this.setState({typeTable: "ОМТС"});
            break;
        case '3':
            this.setState({depName: "ПТО"});
            this.setState({typeTable: "ПТО1"});
            break;
        case '4':
            this.setState({depName: "Монтажники"});
            this.setState({typeTable: "Монтажники1"});
            break;
        default:
            break;
    }
}

    async getUserRoleById(apiRoute, userId) { // функция для получения номера роли пользователя
        // console.log(userData);
        const userIdJson = {userId: userId}
        await fetch(`${this.url}${apiRoute}/userRole`, {
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
           // this.switchDepartment()

            // console.log(data);
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}/userRole`);
        });
    }

    async getUserNameById(apiRoute, userId) { // функция для получения номера роли пользователя
        const userIdJson = {userId: userId}
        await fetch(`${this.url}${apiRoute}/userName`, {
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
            const { userId, userRole, userName, rememberMe } = this.state; // пример использования деструктуризации
            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', userName);
            localStorage.setItem('rememberMe', rememberMe);

            // this.switchDepartment()
            switch (localStorage.getItem('userRole')) {
                case '1':
                    this.setState({depName: "Отчеты",typeTable: "Отчеты1"});
                    console.log('1111111')
                    break;
                case '2':
                    this.setState({depName: "ОМТС", typeTable: "ОМТС"});
                    console.log('22222222')
                    break;
                case '3':
                    this.setState({depName: "ПТО",typeTable: "ПТО1"});
                    break;
                case '4':
                    this.setState({depName: "Монтажники",typeTable: "Монтажники1"});
                    break;
                default:
                    break;
            }
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

    handleChange = (e) => { // функция для фиксирования значения поля "Запомнить меня"
        if (this.state.rememberMe === false){
            this.setState({rememberMe: true})
        }
        else {
            this.setState({rememberMe: false})
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

    logout(){
        localStorage.removeItem('userRole')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        localStorage.removeItem('rememberMe')
        document.location.reload()
        // this.setState({authorisation: false})
    }

    onClickDep = (e) => {
        const buttonName = e.target.title;
        console.log(e.target);

        this.setState({depName: buttonName});
        // console.log(localStorage.getItem('userRole'))
        // console.log(typeof(localStorage.getItem('userRole')))
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
                    rememberMe={this.state.rememberMe}
                    handleChange={this.handleChange}
                />}
                {this.state.authorisation &&
                <div>
                    <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
                    <MapComponent namePKU={this.gettingNamePKU}/>
                    <div id="start"></div>
                    {/*<h2>Вы вошли как пользователь {this.state.userName}</h2> */}
                    <LogoutComponent
                        userName={this.state.userName}
                        // authorisation={this.state.authorisation}
                        logout={this.logout}
                    />
                    {localStorage.getItem('userRole') === '1' && <DepartmentsComponent
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
                    // userRole={this.state.userRole}
                    // userName={this.state.userName}
                    />
                    <br/>
                </div>}

            </div>
        )
    }
}


export default App;