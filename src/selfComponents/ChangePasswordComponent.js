import React, {Component} from 'react';
import './css/ChangePasswordComponent.css'

class ChangePasswordComponent extends Component {
    constructor() {
        super();

    }


    render() {
        return (
            <div className={"changePassDiv"} align={"center"}>
                <form method="post" className={"changePassForm"} align={"center"} onSubmit={this.props.changePassword}>
                    <p className={"changePassText"}>Сменить пароль</p>
                    <br />
                    <input className={"changePassInput"} type="password" name="firstPassword" placeholder="Введите новый пароль" size="40" />
                    <br />
                    <br />
                    <input className={"changePassInput"} type="password" name="secondPassword" placeholder="Подтвердите пароль" size="40" />
                    <br />
                    <br />
                    <button className={"button8"}>Сменить пароль</button>
                </form>
                <p className={"incorrectPass"}>{this.props.incorrectChangePass}</p>
                <button className={"buttonClose"} onClick={this.props.closeChangePassWindow}>X</button>
            </div>
        )
    }
}


export default ChangePasswordComponent;
