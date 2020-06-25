import React, {Component} from 'react';


class TypeTableComponent extends Component {
    constructor() {
        super();
    }

    render() {
        let className = [];
        let classNameActive = ' active';

        switch (this.props.typeTable) {
            case "Отчеты1":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[0] += classNameActive;
                break;
            case "Отчеты2":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[1] += classNameActive;
                break;
            case "ПТО1":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[2] += classNameActive;
                break;
            case "ПТО2":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[3] += classNameActive;
                console.log(className[3]);
                break;
            case "Монтажники1":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[4] += classNameActive;
                console.log(className[3]);
                break;
            case "Монтажники2":
                className = ['tablinks','tablinks','tablinks','tablinks'];
                className[5] += classNameActive;
                console.log(className[3]);
                break;
            default:
                break;
        }


        return (
            <div>
                {this.props.show &&
                <div className="tab">
                    {this.props.depName === "Отчеты" &&
                    <div>
                        <button className={className[0]} title="Отчеты1" onClick={this.props.typeTableFunc}>Отчет №1</button>
                        <button className={className[1]} title="Отчеты2" onClick={this.props.typeTableFunc}>Отчет №2</button>
                    </div>}
                    {this.props.depName === "ПТО" &&
                    <div>
                        <button className={className[2]} title="ПТО1" onClick={this.props.typeTableFunc}>Перечень работ</button>
                        <button className={className[3]} title="ПТО2" onClick={this.props.typeTableFunc}>Перечень оборудования</button>
                    </div>}
                    {this.props.depName === "Монтажники" &&
                    <div>
                        <button className={className[4]} title="Монтажники1" onClick={this.props.typeTableFunc}>Перечень работ</button>
                        <button className={className[5]} title="Монтажники2" onClick={this.props.typeTableFunc}>Перечень оборудования</button>
                    </div>}
                </div>
                }
            </div>
        )
    }
}


export default TypeTableComponent;



