import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';
import DepartmentsComponent from './selfComponents/DepartmentsComponent';
import TableComponent from './selfComponents/TableComponent';
import AuthorisationComponent from './selfComponents/AuthorisationComponent';
import TypeTableComponent from './selfComponents/TypeTableComponent';
import ButtonUpComponent from './selfComponents/ButtonUpComponent';
import ProfileComponent from './selfComponents/ProfileComponent';
import ChangePasswordComponent from './selfComponents/ChangePasswordComponent';

import logo from './Транснефть-лого-шапка.png';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {Map as LeafletMap, Marker, TileLayer} from "react-leaflet";
import * as pkuData from "./data/tRouteTrackPointsKarabash";
import {Icon} from "leaflet";

class App extends React.Component {
    constructor() {

        super();

        this.state = {
            // authorisation: true,
            show: false,        //показать таблицу
            hide: "Нажмите на ПКУ для вывода таблицы",
            idPKU: undefined,
            depName: "ОМТС",
            typeTable: "ОМТС",
            markerName: undefined,
            rootPriv: "Отчеты",
            routeNumber: 2,
            // стейты для авторизации
            authorisation: false,
            authorisationErr: false,
            incorrectUser: false,
            incorrectChangePass: false,
            userId: undefined,
            userRole: undefined,
            userName: undefined,
            showChangePassForm: false,
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
        console.log(this.state.showButtonUp);

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
                this.setState({
                    incorrectUser: false,
                    authorisation: true,
                    userId: data.rows[0].f_s_userid_logpas
                })
                this.getUserRoleById(apiRoute, data.rows[0].f_s_userid_logpas)

            } else this.setState({
                incorrectUser:true
            })
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}`);
        });
    }

    switchDepartment(){
        switch (localStorage.getItem('userRole')) {
            case '1':
                this.setState({depName: "Отчеты"});
                // console.log('1111111')
                this.setState({typeTable: "Отчеты1"});
                break;
            case '2':
                this.setState({depName: "ОМТС"});
                // console.log('22222222')
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
            this.getUserNameById(apiRoute, userId)
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

    gettingNamePKU = (id, name, routenumber, openPopup) => {
        // e.preventDefault();
        // console.log(routenumber);
        // const id = e.target.options.title;
        // const name = e.target.options.name;

        // console.log(e.target.options);

        if (openPopup) {

        }

        if (id) {
            this.setState({
                show: true,
                hide: false,
                idPKU: id,
                routeNumber: routenumber,
                markerName: name
            });
        } else {
            this.setState({
                show: false,
                hide: "Нажмите на ПКУ для вывода таблицы",
                idPKU: undefined,
                routeNumber: routenumber,
                markerName: name

            });
        }
    };



    logout(){ // обработчик события выхода из аккаунта
        localStorage.removeItem('userRole')
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        localStorage.removeItem('rememberMe')
        document.location.reload()
        // this.setState({authorisation: false})
    }

    changePassOpenWindow = () => {
        let flag = !this.state.showChangePassForm;
        this.setState({
            showChangePassForm: true
        });
    }

    closeChangePassWindow = () => {
        this.setState({
            showChangePassForm: false
        });
    }

    changePassword = async (e) => {
        e.preventDefault();
        const firstPass = e.target.elements.firstPassword.value;
        const secondPass = e.target.elements.secondPassword.value;
        const apiRoute = 'api/changePassword';
        let regexp = /^[a-z\s0-9@#$]+$/i;

        if (!regexp.test(firstPass)) {
            this.setState({incorrectChangePass: "Разрешенные символы в пароле: A-Za-z0-9@#$"});
        } else if (firstPass !== secondPass) {
            this.setState({incorrectChangePass: "Пароли не совпадают"});
        } else {
            const passwords = {userId: this.state.userId, password: firstPass};
            await fetch(`${this.url}${apiRoute}`, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                mode: "cors",
                body: JSON.stringify(passwords),
            }).then(results => {
                console.log(results);
                this.closeChangePassWindow();
                this.setState({incorrectChangePass: false})
                return results.json();
            }).then(data => {
                if (data.rows) {
                    console.log("Пользователь с ID №" + data.rows[0].f_s_userid_changepas + " успешно сменил пороль");
                }
            }).catch((err) => {
                console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}`);
                this.setState({incorrectChangePass: "Не удалось изменить пароль. Ошибка сервера."});
            });
        }

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
            case "Логи":
                this.setState({typeTable: "Логи"});
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
            <div id={"globalDiv"}>

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
                <div id="mainDiv">

                    <table width={"100%"} >
                        <tr>
                            <td><img src={logo} width="400px"/></td>
                            <td><div className="mainHeader" ><h1>ОМЕГА "СПиКИР"</h1></div></td>
                            <td>
                                <ProfileComponent
                                    userName={this.state.userName}
                                    showChangePassForm={this.state.showChangePassForm}
                                    changePassOpenWindow={this.changePassOpenWindow}
                                    logout={this.logout}
                                />
                            </td>
                            {/*<td><button className="button8" onClick={this.logout} type="button">Выход</button></td>*/}
                        </tr>
                    </table>

                    <ButtonUpComponent />
                    {this.state.showChangePassForm &&
                        <ChangePasswordComponent
                            incorrectChangePass={this.state.incorrectChangePass}
                            changePassword={this.changePassword}
                            closeChangePassWindow={this.closeChangePassWindow}
                        />
                    }
                    <MapComponent
                        namePKU={this.gettingNamePKU}
                        routeNumber={this.state.routeNumber}
                        selectedId={this.state.idPKU}
                    />
                    <br/>
                    {/*<h2>Вы вошли как пользователь {this.state.userName}</h2>*/}
                    {/*<LogoutComponent*/}
                    {/*    userName={this.state.userName}*/}
                    {/*    // authorisation={this.state.authorisation}*/}
                    {/*    logout={this.logout}*/}
                    {/*/>*/}

                    <div id="start"></div>
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
                        // routeNumber={this.state.routeNumber}
                    />

                    {this.state.idPKU && (this.state.typeTable === "Монтажники1" || this.state.typeTable === "ПТО1" ) && this.state.routeNumber === 2 && <p className="Table-header"><h2 align="center">Перечень работ на {this.state.markerName} (Альметьевск - Карабаш) </h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "Монтажники2" || this.state.typeTable === "ПТО2") && this.state.routeNumber === 2 && <p className="Table-header"><h2 align="center">Перечень оборудования на {this.state.markerName} (Альметьевск - Карабаш) </h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "ОМТС" || this.state.typeTable === "Отчеты1" || this.state.typeTable === "Отчеты2") && this.state.routeNumber === 2 && <p className="Table-header"><h2 align="center">Маршрут Альметьевск - Карабаш</h2></p>}

                    {this.state.idPKU && (this.state.typeTable === "Монтажники1" || this.state.typeTable === "ПТО1" ) && this.state.routeNumber === 3 && <p className="Table-header"><h2 align="center">Перечень работ на {this.state.markerName} (Альметьевск - Башкултаево)</h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "Монтажники2" || this.state.typeTable === "ПТО2") && this.state.routeNumber === 3 && <p className="Table-header"><h2 align="center">Перечень оборудования на {this.state.markerName} (Альметьевск - Башкултаево) </h2></p>}
                    {this.state.idPKU && (this.state.typeTable === "ОМТС" || this.state.typeTable === "Отчеты1" || this.state.typeTable === "Отчеты2") && this.state.routeNumber === 3 && <p className="Table-header"><h2 align="center">Маршрут Альметьевск - Башкултаево</h2></p>}


                    <TableComponent
                    show={this.state.show}
                    hide={this.state.hide}
                    idPKU={this.state.idPKU}
                    depName={this.state.depName}
                    typeTable={this.state.typeTable}
                    markerName={this.state.markerName}
                    routeNumber={this.state.routeNumber}
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