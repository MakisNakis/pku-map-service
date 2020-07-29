import React, {Component} from 'react';

class LogoutComponent extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div class="auth" align='center'>
                <h2>Вы вошли как пользователь {this.props.userName}</h2>
                <input value="Выйти" onClick={this.props.logout} type="button">
                </input>
                {this.props.incorrectUser === true && <h3>Неверный логин или пароль ;^(</h3>}
                {this.props.authErr}
            </div>
        )
    }
}


export default LogoutComponent;



