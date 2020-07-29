import React, {Component} from 'react';

class LogoutComponent extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div class="auth">
                <table>
                    <tr>
                        <td><h2>Вы вошли как пользователь {this.props.userName} (выход здесь)</h2></td>
                        <td>=====></td>
                        <td><button  onClick={this.props.logout} type="button">Выйти</button></td>
                    </tr>
                </table>
                {this.props.incorrectUser === true && <h3>Неверный логин или пароль ;^(</h3>}
                {this.props.authErr}
            </div>
        )
    }
}


export default LogoutComponent;



