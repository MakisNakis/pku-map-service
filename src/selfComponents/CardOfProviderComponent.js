import React, { Component } from 'react';
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import './css/CardOfProviderComponent.css';
import {Link} from "react-scroll";

class CardOfProviderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAboutProvider: {},
            editableRow: null,
        }
        this.appRoute = null;
    }

    async fetchFromProviderApi(data) {
        await fetch('/api/cardOfProvider', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({DeliveryId: data}),
        }).then(results => results.json()
        ).then(data => {
            console.log(data[0]);
            data[0].tableID = 1;
            console.log(data[0]);

            // let dataAboutProviderWithID = data.map((val, ix) => {
            //     val.tableID = ix+1;
            //     // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
            //     return val;
            // });
            this.setState({
                dataAboutProvider: data[0],
            });
        }).catch((err) => {
            console.log(err, "cardOfProviders");
        });
    }

    componentDidMount() {
        this.fetchFromProviderApi(this.props.selectedRowDeliveryId);
        this.appRoute = document.getElementById('globalDiv');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedProviderId !== prevProps.selectedProviderId) {
            this.fetchFromProviderApi(this.props.selectedRowDeliveryId);
        }
        if (this.state.dataAboutProvider !== prevState.dataAboutProvider) {
            console.log(this.state.dataAboutProvider);
            console.log(this.state.dataAboutProvider.Name);
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

    providersListGeneration(providers) {
        let buttons = [];

        console.log(providers)

        for (const provider of providers) {
        // for (let i = 0; i < pkuData.length; i++) {
            if (this.props.selectedProviderId === provider.value) {
                console.log(provider.value)
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

    editableTable(data, columns) {
        let trs = [];
        let columnName = false;
        for (const property in data) {
            console.log(property, data[property])
            columnName = this.selectHeaders(property, columns)
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
                                    data[property] = this.editInput.value;
                                    this.setState({
                                        editableRow: null,
                                        dataAboutProvider: data
                                    })
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        data[property] = this.editInput.value;
                                        this.setState({
                                            editableRow: null,
                                            dataAboutProvider: data
                                        })
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

        const nahui = "попивси разбiйник";

        const columnsFields = [{
            dataField: 'Name',
            text: 'Название',
        }, {
            dataField: 'Contact',
            text: 'Контактная информация',
        }, {
            dataField: 'INN',
            text: 'ИНН',
        }];

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
                                        <table>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <button
                                                            className={"button9 btnPku"}
                                                            name="addProvider"
                                                        >
                                                            Добавить контрагента
                                                        </button>
                                                    </div>
                                                    <hr className="hrCardOfProvider"/>
                                                </td>
                                            </tr>
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
                                    <td className="cardComp">
                                        {this.state.dataAboutProvider !== null &&
                                        <div className="cardOfProviderDiv">
                                            <table className="cardOfProvidersTable">
                                                {this.editableTable(this.state.dataAboutProvider, columnsFields)}
                                            </table>
                                        </div>}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <button className="buttonClose button7" onClick={() => {
                            this.props.closeWindowPortal();
                            // this.appRoute.style.display = 'none';
                            // this.appRoute.style.overflowY = 'hidden';
                        }}>
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardOfProviderComponent;