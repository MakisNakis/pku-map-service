import React, {Component} from 'react';


class DepartmentsComponent extends Component {
    constructor() {
        super();
    }

    render() {

        let className = [];
        let classNameActive = ' active';

        switch (this.props.depName) {
            case "ОМТС":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[0] += classNameActive;
                break;
            case "Монтажники":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[1] += classNameActive;
                break;
            case "ПТО":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[2] += classNameActive;
                break;
            case "Отчеты":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[3] += classNameActive;
                console.log(className[3]);
                break;
            default:
                break;
        }


        return (
            <div>
                {this.props.show &&
                <div className="tab">
                    <button className={className[0]}  title="ОМТС" onClick={this.props.depNameFunc}>ОМТС</button>
                    <button className={className[1]} title="Монтажники" onClick={this.props.depNameFunc}>Монтажники</button>
                    <button className={className[2]} title="ПТО" onClick={this.props.depNameFunc}>ПТО</button>
                    <button className={className[3]} title="Отчеты" onClick={this.props.depNameFunc}>Отчеты</button>
                </div>
                }
                {this.props.hide}
            </div>
        )
    }
}


export default DepartmentsComponent;



