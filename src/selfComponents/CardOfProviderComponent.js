import React, {Component, useState} from 'react';
import InsertNewDocumentModalComponent from './InsertNewDocumentModalComponent'
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import './css/TableComponent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import './css/CardOfProviderComponent.css';

import './css/CardOfProviderComponent.css';
import {Link} from "react-scroll";

class CardOfProviderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAboutProvider: {},
            dataAboutDocuments: [],
            documentsTableId: undefined,
            editableRow: null,
            addProviderOn: false,
            documentInsertModal: false, // стейт, меняющийся на true при нажатии на карточке на кнопку добавить новый документ
            f_s_docs_list: null,
            f_s_paymenttype_list: null,
            f_s_deliverytype_list: null
        }
        this.emptyProvider = {
            ID: null,
            Name: '',
            Contact: '',
            INN: '',
        }
        this.appRoute = null;
    }

    async fetchFromProviderApi(data) {
        await fetch('/api/cardOfProvider', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({ProviderId: data}),
        }).then(results => results.json()
        ).then(data => {
            if (data[0] !== undefined) {
                this.setState({
                    dataAboutProvider: data[0],
                });
            } else {
                this.setState({
                    dataAboutProvider: {},
                });
            }
        }).catch((err) => {
            console.log(err, "cardOfProvider");
        });
    }

    async fetchFromDocumentsApi(providerId) {
        await fetch('/api/selectProvidersDocuments', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({ProvidersId: providerId}),
        }).then(results => results.json()
        ).then(data => {
            // console.log(data);
            let documentsTableId = data.map((val, ix) => {
                val.tableID = ix+1;
                // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
                return val;
            });
            this.setState({
                documentsTableId: documentsTableId,
            });

            this.setState({
                dataAboutDocuments: data,
            });
        }).catch((err) => {
            console.log(err, "providersDocuments");
        });
    }


    async fetchOnDocumentsApi(apiRoute, rowEdit) {
        let jsonObj = {rowEdit: rowEdit, userId: localStorage.getItem('userId'), routeNumber: this.props.routeNumber, providerId: this.props.selectedProviderId}
        // console.log(jsonObj)
        // console.log(apiRoute)
        // console.log(this.props.url)
        await fetch(`${this.props.url}${apiRoute}`, {
            // await fetch('http://192.168.1.116:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(jsonObj),
        }).then(results => {
            return results.json();
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}`);
        });
    }


    componentDidMount() {
        this.fetchFromProviderApi(this.props.selectedProviderId);
        this.appRoute = document.getElementById('globalDiv');
        this.fetchFromDocumentsApi(this.props.selectedProviderId);
        console.log(this.state.f_s_docs_list)

        this.f_s_docs_list()
            .then(data => {
                this.state.f_s_docs_list = data;
            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для выполнения функции f_s_docs_list()");
            });

        console.log(this.state.f_s_docs_list)

        this.f_s_paymenttype_list()
            .then(data => {
                this.state.f_s_paymenttype_list = data;
            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для выполнения функции f_s_paymenttype_list()");
            });

        this.f_s_deliverytype_list()
            .then(data => {
                this.state.f_s_deliverytype_list = data;
            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для выполнения функции f_s_deliverytype_list()");
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedProviderId !== prevProps.selectedProviderId) { // если выбираешь другого контрагента
            this.fetchFromProviderApi(this.props.selectedProviderId);
            this.fetchFromDocumentsApi(this.props.selectedProviderId);
            console.log(this.props.selectedProviderId);

            this.f_s_docs_list()
                .then(data => {
                    this.state.f_s_docs_list = data;
                })
                .catch(() => {
                    console.log("Ошибка при асинхронном запросе для выполнения функции f_s_docs_list()");
                });

            this.f_s_paymenttype_list()
                .then(data => {
                    this.state.f_s_paymenttype_list = data;
                })
                .catch(() => {
                    console.log("Ошибка при асинхронном запросе для выполнения функции f_s_paymenttype_list()");
                });

            this.f_s_deliverytype_list()
                .then(data => {
                    this.state.f_s_deliverytype_list = data;
                })
                .catch(() => {
                    console.log("Ошибка при асинхронном запросе для выполнения функции f_s_deliverytype_list()");
                });
        }
        if (this.state.dataAboutProvider !== prevState.dataAboutProvider) {
            // console.log(this.state.dataAboutProvider);
            // console.log(this.state.dataAboutProvider);
        }
    }

    selectHeaders(colName, columns) {
        for (const column of columns) {
            if (column.dataField === colName) {
                return column.text;
            }
        }
        return false;
    }

    changeDocumentState(){
        switch (this.state.documentInsertModal){
            case true:
                this.setState({documentInsertModal: false})
                break
            case false:
                this.setState({documentInsertModal: true})
                break
        }
    }

    //_-_-----------------------------__-_
    async f_s_docs_list() {
        const f_s_docs_list = [];
        const f_s_docs_listMas = await fetch('/api/f_s_docs_list')
            .then(result => result.json())
            .then(data => {
                const lenMas = data.rows.length;
                for( let i = 0; i < lenMas; i++) {
                    f_s_docs_list[i] = {
                        label: data.rows[i].Name,
                        value: data.rows[i].ID
                    }
                }
                return f_s_docs_list;
            }).catch(() => {
                console.log('Ошибка на /api/f_s_docs_list');
            });
        return f_s_docs_listMas;
    }

    async f_s_paymenttype_list() {
        const f_s_paymenttype_list = [];
        const f_s_paymenttype_listMas = await fetch('/api/f_s_paymenttype_list')
            .then(result => result.json())
            .then(data => {
                const lenMas = data.rows.length;
                for( let i = 0; i < lenMas; i++) {
                    f_s_paymenttype_list[i] = {
                        label: data.rows[i].Name,
                        value: data.rows[i].ID
                    }
                }
                return f_s_paymenttype_list;
            }).catch(() => {
                console.log('Ошибка на /api/f_s_paymenttype_list');
            });
        return f_s_paymenttype_listMas;
    }

    async f_s_deliverytype_list() {
        const f_s_deliverytype_list = [];
        const f_s_deliverytype_listMas = await fetch('/api/f_s_deliverytype_list')
            .then(result => result.json())
            .then(data => {
                const lenMas = data.rows.length;
                for( let i = 0; i < lenMas; i++) {
                    f_s_deliverytype_list[i] = {
                        label: data.rows[i].Name,
                        value: data.rows[i].ID
                    }
                }
                return f_s_deliverytype_list;
            }).catch(() => {
                console.log('Ошибка на /api/f_s_deliverytype_list');
            });
        return f_s_deliverytype_listMas;
    }
    //_-_-----------------------------__-_

    providersListGeneration(providers) {
        let buttons = [];

        // console.log(providers)

        for (const provider of providers) {
        // for (let i = 0; i < pkuData.length; i++) {
            if (this.props.selectedProviderId === provider.value) {
                // console.log(provider.value)
                buttons.push(
                    <tr>
                        <td>
                            <div id={"selectedProvider"}>
                                <button
                                    className={"button8 btnPku buttonSelected"}
                                    title={provider.value}
                                    name={provider.label}
                                    onClick={(e) => {
                                        this.props.selectProviderId(provider.value);
                                    }}
                                >
                                    {provider.label}
                                </button>
                            </div>
                        </td>
                    </tr>
                );
            } else {
                buttons.push(
                    <tr>
                        <td>
                            <button
                                className={"button8 btnPku"}
                                title={provider.value}
                                name={provider.label}
                                onClick={(e) => {
                                    this.props.selectProviderId(provider.value);
                                }}
                            >
                                {provider.label}
                            </button>
                        </td>
                    </tr>
                );
            }
        }
        return buttons;
    }

    updateCardOfComponent(dataOfProviders) {
        this.setState({
            editableRow: null,
            dataAboutProvider: dataOfProviders
        })
    }

    async fetchOnProviderApi(data) {
        this.updateCardOfComponent(data)
        let dataObj = this.state.dataAboutProvider
        dataObj.UserId = parseInt(this.props.userId)
        console.log(dataObj)
        await fetch('/api/cardOfProvider', {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(dataObj),
        }).then(results => results.json()
        ).then(data => {
            console.log(data)
            this.fetchFromProviderApi(this.props.selectedProviderId)
        }).catch((err) => {
            console.log(err, "cardOfProvider");
        });
    }

    addProvider() {
        this.setState(state => ({
            ...state,
            addProviderOn: !state.addProviderOn,
            // dataAboutProvider: this.emptyProvider
        }));
    }

    editableTable(data, columns) {
        let trs = [];
        let columnName = false;
        console.log(data)

        for (const property in data) {
            // console.log(property, data[property])
            columnName = this.selectHeaders(property, columns)
            console.log(columnName)
            if (columnName) {
                if (this.state.editableRow === property) {
                    trs.push(
                        <tr className="trMargin">
                            <td className="headerWidthCardOfProviders1">{columnName}:</td>
                            <input
                                type="text"
                                className="cardOfProvidersInput"
                                ref={node => {
                                    this.editInput = node;
                                    if (this.editInput !== null) {
                                        this.editInput.focus();
                                    }
                                }}
                                onBlur={() => {
                                    data[property] = this.editInput.value
                                    this.fetchOnProviderApi(data)
                                }
                                }
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        data[property] = this.editInput.value
                                        this.fetchOnProviderApi(data)
                                    }
                                }}
                                defaultValue={data[property]}
                            />
                        </tr>
                    );
                } else {
                    trs.push(
                        <tr className="trMargin">
                            <td className="headerWidthCardOfProviders1">{columnName}:</td>
                            <td className="headerWidthCardOfProviders2"
                                onDoubleClick={() => {
                                    this.setState({
                                        editableRow: property,
                                    })
                                }}
                            >{data[property]}</td>
                        </tr>
                    );
                }
            }
        }

        return trs;
    }

    render() {
        // заголовки для таблицы контрагента

        const ProviderColumnsFields = [
        {
            dataField: 'Name',
            text: 'Название',
        }, {
            dataField: 'Contact',
            text: 'Контактная информация',
        }, {
            dataField: 'INN',
            text: 'ИНН',
        }];

        //заголовки для таблицы документов контрагентов
        const DocumentsColumnsFields = [
            {
                dataField: 'Name',
                text: 'Номер договора',
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },{
                dataField: 'DocType',
                text: 'Тип договора',
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },{
                dataField: 'ParentType',
                text: 'Номер связанного договора',
                editor: {
                    type: Type.SELECT,
                    options: this.state.f_s_docs_list
                },
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },{
                dataField: 'PaymentType',
                text: 'Тип оплаты',
                editor: {
                    type: Type.SELECT,
                    options: this.state.f_s_paymenttype_list
                },
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            }, {
                dataField: 'StartDate',
                text: 'Дата заключения',
                editor: {
                    type: Type.DATE,
                    defaultValue: Date.now()
                },
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            }, {
                dataField: 'EndDate',
                text: 'Дата окончания',
                editor: {
                    type: Type.DATE,
                    defaultValue: Date.now()
                },
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            }, {
                dataField: 'Way',
                text: 'Путь до файла',
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },
            {
                dataField: 'DeliveryType',
                text: 'Тип поставки',
                editor: {
                    type: Type.SELECT,
                    options: this.state.f_s_deliverytype_list
                },
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },
            {
                dataField: 'UserName',
                text: 'Пользователь',
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },
            {
                dataField: 'DateUp',
                text: 'Дата внесения изменений',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return {width: '10%', textAlign: 'center'};
                }
            },
        ];

        const expandRow = {
            renderer: row => (
                <div>....</div>
            )
        };

        const indication = () => {
            return "В таблице нет информации";
        }

        const messageErr = () => {                                                         // TODO: проверить
            return "Контрагент не выбран";
        }

        return (
            <div id="grayBackgroundDiv">
                {/*<h1>Provider ID: {this.props.selectedProviderId}</h1>*/}
                <div id="cardOfProviderDiv">

                    <div className="blockDiv">
                        <div className="headerCardOfProvider" align="center">
                            Карточка контрагента
                        </div>
                        <div className="cardOfProvidersMargin">

                            <table>
                                <tr>
                                    <td className="listOfProvidersTd">
                                        <table width="100%">
                                            {/*<tr>*/}
                                            {/*    <td>*/}
                                            {/*        <div>*/}
                                            {/*            <button*/}
                                            {/*                className={"button9 btnPku"}*/}
                                            {/*                name="addProvider"*/}
                                            {/*                onClick={() => {*/}
                                            {/*                    this.addProvider();*/}
                                            {/*                }}*/}
                                            {/*            >*/}
                                            {/*                {(this.state.addProviderOn) ? 'Отменить' : 'Добавить контрагента'}*/}
                                            {/*            </button>*/}
                                            {/*        </div>*/}
                                            {/*        <hr className="hrCardOfProvider"/>*/}
                                            {/*    </td>*/}
                                            {/*</tr>*/}
                                            <tr>
                                                <td className={"cardComp"}>
                                                    <div id={"providerListCompDiv"}>
                                                        <div className={"tableProviderListScroll"}>
                                                            <table>
                                                                {this.providersListGeneration(this.props.providersList)}
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    {(Object.keys(this.state.dataAboutProvider).length > 0) ?
                                    <td className="cardComp">
                                        <div className="cardOfProviderDiv">
                                            <table className="cardOfProvidersTable">
                                                {this.editableTable(this.state.dataAboutProvider, ProviderColumnsFields)}
                                                {/*{(this.state.addProviderOn) ? this.editableTable(this.emptyProvider, ProviderColumnsFields) : this.editableTable(this.state.dataAboutProvider, ProviderColumnsFields)}*/}
                                            </table>
                                        </div>
                                    </td>
                                    :
                                    <td className="cardComp">
                                        <div className="cardOfProviderDiv">
                                            <div className="errText">
                                                Контрагент не выбран
                                            </div>
                                        </div>
                                    </td>}
                                </tr>
                            </table>
                        </div>
                        {/*<button className="buttonClose button7" onClick={() => {*/}
                        {/*    this.props.closeWindowPortal();*/}
                        {/*    // this.appRoute.style.display = 'none';*/}
                        {/*    // this.appRoute.style.overflowY = 'hidden';*/}
                        {/*}}>*/}
                        {/*    Закрыть*/}
                        {/*</button>*/}
                    </div>
                {/*    {this.state.dataAboutProvider !== null &&*/}
                {/*    <div>*/}
                {/*        <h1>Карточка контрагента</h1>*/}
                {/*        /!*<h1>Карточка контрагента {this.state.dataAboutProvider[0].Name}</h1>*!/*/}

                {/*    <table>*/}
                {/*        {this.editableTable(this.state.dataAboutProvider, ProviderColumnsFields)}*/}
                {/*    </table>*/}
                {/*</div>}*/}

                   <button className="buttonClose button7" onClick={() => {
                        this.props.closeWindowPortal();
                       // this.setState({documentInsertModal: false})

                       // this.appRoute.style.display = 'none';
                        // this.appRoute.style.overflowY = 'hidden';
                    }}>
                        Закрыть
                    </button>


                    <div className="blockDiv">
                        <div className="headerCardOfProvider" align="center">
                            Список документов
                        </div>
                        <div className="cardOfProvidersMargin">

                        <button className="button9" onClick={() => {
                        // this.setState({documentInsertModal: true})
                       this.changeDocumentState()

                    }}>
                        Добавить новый документ
                    </button>
                        {/*</div>*/}
                {/*<button onClick={() => this.props.closeWindowPortal()} >*/}
                {/*    Close me!*/}
                {/*</button>*/}
                <br/>
                    <br/>

                    {this.state.documentInsertModal === false &&
                <ToolkitProvider
                    keyField={"tableID"}
                    data={this.state.dataAboutDocuments}
                    columns={DocumentsColumnsFields}
                    search
                    insertRow = {true}
                    deleteRow = {true}
                >
                    {
                        props => (

                            <BootstrapTable
                                // wrapperClasses="table-horiz-scroll"
                                // headerClasses="thead"
                                // bodyClasses="tbody"
                                noDataIndication={ indication }
                                cellEdit={cellEditFactory({
                                    mode: 'dbclick',
                                    // blurToSave: true,
                                    // onStartEdit: () => {console.log(document.activeElement);},
                                    afterSaveCell: (oldValue, newValue, row, column) => {

                                        if (oldValue !== newValue) {
                                            // console.log(row);
                                            this.fetchOnDocumentsApi(`/api/updateProvidersDocuments`, row);
                                        }
                                    }
                                })}
                                {...props.baseProps}
                            />

                        )
                    }

                </ToolkitProvider>
                        }
                    {this.state.documentInsertModal === true &&
                        <InsertNewDocumentModalComponent/>
                    }
                </div>
                </div>

                </div>
            </div>
        )
    }
}

export default CardOfProviderComponent;