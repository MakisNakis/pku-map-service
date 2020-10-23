import React, { Component } from 'react';
import logo from "../499486.jpg";

import './css/TableComponent.css';

class InsertNewDocumentModalComponent extends Component {
    constructor() {
        super();
        this.state ={
            documentName: null
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({documentName: value});
    }

    render() {
        return (
            <div align={'center'}>

                <form>
                    <div className={"inputFont"}>
                        <label>Введите наименование нового документа </label>
                    </div>
                    <input className={"input"}></input>
                </form>

                <br/>
                <button type={"submit"} className={"button7"} onChange={this.handleUserInput}>Добавить</button>
            </div>
        )
    }
}

export default InsertNewDocumentModalComponent;


