import React, {Component} from 'react';
import './css/AuthorisationComponent.css';
// c
class AuthorisationComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="auth" align='center'>
                <p class="progName">
                    Система Планирования и Контроля Исполнения Работ
                    <br/>
                    (СПиКИР)
                </p>
                <br/>
                <form method="post" onSubmit={this.props.getPersonName}>
                {/*<form method="post" onSubmit={this.props.getPersonName}>*/}
                    <input type="text" name="loginPerson" placeholder="Логин" size="40" />
                    <br/>
                    <input type="password" name="passwordPerson" placeholder="Пароль" size="40" />
                    <br/>
                    <br/>
                    <button className={"button8"}>Авторизоваться</button>
                    <br/>
                    <br/>
                    <label>
                        <input name="RememberMe" checked={this.props.rememberMe} onChange={this.props.handleChange} type="checkbox"/> Запомнить меня
                    </label>
                </form>
                {this.props.incorrectUser === true && <p className={"incorrectAuth"}>Неверный логин или пароль</p>}
                {this.props.authErr}
            </div>
        )
    }
}


export default AuthorisationComponent;
