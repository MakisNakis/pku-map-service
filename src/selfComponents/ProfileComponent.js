import React, {Component} from 'react';
import imgAdmin from '../admin.png';
import imgUser from '../user.png';

import './css/ProfileComponent.css';


class ProfileComponent extends Component {
    constructor() {
        super();

        this.state = {
            showList: false
        }
    }

    clickProfile() {
        let flag = !this.state.showList;
        this.setState({showList: flag})
    }

    closeProfile() {
        this.setState({showList: false})
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыаем таблицу
        if (nextProp.showChangePassForm === false && nextProp.showChangePassForm !== this.props.showChangePassForm) {
            this.closeProfile();
        }
    }

    render() {
        return (
            <div className={"profileComponent"} align={"right"} >
                <table className={"tableList"} >
                    <tr onClick={this.clickProfile.bind(this)}>
                        <label className={"profileName"}>{this.props.userName}</label>
                            <button className={"buttonProfile"}>
                                <img src={imgUser}/>
                            </button>
                    </tr>
                    {this.state.showList &&
                    <div className={"divList"} align={"center"}>
                        <tr >
                            <td>
                                <button className={"buttonList button7"} onClick={this.props.changePassOpenWindow}>
                                    Сменить пороль
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className={"buttonList button7"} onClick={this.props.logout}>
                                    Выход
                                </button>
                            </td>
                        </tr>
                    </div>}
                </table>



            </div>
        )
    }
}


export default ProfileComponent;



