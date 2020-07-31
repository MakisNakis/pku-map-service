import React, {Component} from 'react';


class AuthorisationComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div class="auth" align='center'>
                <form method="post" onSubmit={this.props.getPersonName}>
                    <input type="text" name="loginPerson" placeholder="Логин" size="40"></input>
                    <br/>
                    <input type="password" name="passwordPerson" placeholder="Пароль" size="40"></input>
                    <br/>
                    <br/>
                    <button className={"button8"}>Авторизоваться</button>
                    <br/>
                    <br/>
                    <label>
                        <input name="RememberMe" checked={this.props.rememberMe} onChange={this.props.handleChange} type="checkbox"/> Запомнить меня
                    </label>
                </form>
                {this.props.incorrectUser === true && <h3>Неверный логин или пароль ;^(</h3>}
                {this.props.authErr}
            </div>
        )
    }
}


export default AuthorisationComponent;



