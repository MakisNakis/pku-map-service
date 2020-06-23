import React, {Component} from 'react';


class AuthorisationComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <form method="post" onSubmit={this.props.getPersonName}>
                    <input type="text" name="loginPerson" placeholder="Логин" size="40"></input>
                    <br/>
                    <input type="password" name="passwordPerson" placeholder="Пороль" size="40"></input>
                    <br/>
                    <button>Авторизоваться</button>
                </form>
                {this.props.authErr}
            </div>
        )
    }
}


export default AuthorisationComponent;



