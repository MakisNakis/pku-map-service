import React, { Component } from 'react';
import logo from "../499486.jpg";

import './css/TableComponent.css';

class InsertNewDocumentModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state ={
            documentName: '',
            errorAlert: false
        }

    }

    // getInitialState = () => {
    //     return {
    //         : ''
    //     };
    // }

    updateInputValue = (evt) => {
        this.setState({
            documentName: evt.target.value
        })
        console.log(this.state.documentName)
    }

    async uploadFunc(){
            let jsonObj = {userId: this.props.userId, routeNumber: this.props.routeNumber, providerId: this.props.providerId, rowEdit: this.state.documentName, updateOrInsert: 'Insert'}
            console.log(jsonObj)
            console.log(this.props.url)
            await fetch(`${this.props.url}api/updateProvidersDocuments`, {
                // await fetch('http://192.168.1.116:5000/api/test1', {
                method: 'POST',
                headers:{'content-type': 'application/json'},
                mode: "cors",
                body: JSON.stringify(jsonObj),
            }).then(results => {
                this.props.documentInsertModalFunc()
                // return results.json();
            }).catch((err) => {
                console.log(`${err}. Ошибка при отправке запроса на /api/updateProvidersDocuments`);
            });
    }

    dbUpdateQuery = () => {
        if (this.state.documentName === ''){
            this.setState({
                errorAlert: true
            })
        } else {
            this.setState({
                errorAlert: false
            })
            this.uploadFunc()
        }
        // // const docName = document.getElementById("input").value
        // // this.setState({documentName: docName});
        // console.log(this.state.documentName)
        // console.log(this.props.providerId)
        // console.log(this.props.userId)
        // console.log(this.props.routeNumber)
    }

    // fuckOffEnter(event){
    //     event.preventDefault()
    // }

    render() {
        return (
            <div align={'center'}>

                {/*<form>*/}
                    <div className={"inputFont"}>
                        <label>Введите наименование нового документа </label>
                    </div>
                    <input className={"input"} onChange={this.updateInputValue}/>
                {/*</form>*/}
                {this.state.errorAlert && (
                    <div className={"inputFontErr"}>Вы ввели пустое значение</div>
                )
                }
                <br/>
                <button type={"submit"} className={"button7"} onClick={this.dbUpdateQuery}>Добавить</button>
            </div>
        )
    }
}

export default InsertNewDocumentModalComponent;


