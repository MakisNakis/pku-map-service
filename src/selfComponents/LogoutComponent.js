import React, {Component} from 'react';

class LogoutComponent extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <div>
                <br/>
                <table>
                    <tr>
                        <td><h2>Вы вошли как пользователь {this.props.userName} </h2></td>
                    </tr>
                </table>
                <td><button  onClick={this.props.logout} type="button">Выйти</button></td>
                <br/>
                {/*<br/>*/}
                {this.props.incorrectUser === true && <h3>Неверный логин или пароль ;^(</h3>}
                {this.props.authErr}
            </div>
        )
    }
}


export default LogoutComponent;



