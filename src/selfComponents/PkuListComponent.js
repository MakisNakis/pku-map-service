import React, {Component} from 'react';




class PkuListComponent extends Component {

    constructor() {
        super();

        this.state = {

        };

    }

    pkuListGeneration() {
        let items = [];
        // for (let i = 0; i < this.props.userData.user_data.length; i++) {
        //     items.push(<option key={this.props.userData.user_data[i].id} value={this.props.userData.user_data[i].id}>{this.props.userData.user_data[i].first_name}</option>);
        // }
        return items;
    }

render() {

        return (
            <div align="center">
                <p>Список ПКУ</p>
                <select>
                    {this.pkuListGeneration()}
                </select>
            </div>
        );
    }
}

export default PkuListComponent
