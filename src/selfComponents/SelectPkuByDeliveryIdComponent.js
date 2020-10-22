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


class SelectPkuByDeliveryIdComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tableId: undefined,
            editableRow: null,
            documentInsertModal: false // стейт, меняющийся на true при нажатии на карточке на кнопку добавить новый документ
        }
        this.appRoute = null;
    }


    async fetchFromPkuByDeliveryIdApi(providerId) {
        await fetch('/api/selectFromPkuByDeliveryId', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify({ProvidersId: this.props.selectedRowDeliveryId}),
        }).then(results => results.json()
        ).then(data => {
            console.log(data);
            let documentsTableId = data.map((val, ix) => {
                val.tableID = ix+1;
                // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
                return val;
            });
            this.setState({
                tableId: documentsTableId,
            });

            this.setState({
                data: data,
            });
            console.log(data)
        }).catch((err) => {
            console.log(err, "selectFromPkuByDeliveryId");
        });
    }


    // async fetchOnDocumentsApi(apiRoute, rowEdit) {
    //     let jsonObj = {rowEdit: rowEdit, userId: localStorage.getItem('userId'), routeNumber: this.props.routeNumber, providerId: this.props.selectedProviderId}
    //     // console.log(jsonObj)
    //     console.log(apiRoute)
    //     console.log(this.props.url)
    //     await fetch(`${this.props.url}${apiRoute}`, {
    //         // await fetch('http://192.168.1.116:5000/api/test1', {
    //         method: 'POST',
    //         headers:{'content-type': 'application/json'},
    //         mode: "cors",
    //         body: JSON.stringify(jsonObj),
    //     }).then(results => {
    //         return results.json();
    //     }).catch((err) => {
    //         console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}`);
    //     });
    // }


    componentDidMount() {
        this.appRoute = document.getElementById('globalDiv');
        this.fetchFromPkuByDeliveryIdApi(this.props.selectedProviderId);
    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.selectedProviderId !== prevProps.selectedProviderId) {
    //         this.fetchFromProviderApi(this.props.selectedRowDeliveryId);
    //     }
    //     if (this.state.dataAboutProvider !== prevState.dataAboutProvider) {
    //         console.log(this.state.dataAboutProvider);
    //         console.log(this.state.dataAboutProvider);
    //     }
    // }


    render() {

        //заголовки для таблицы списка ПКУ
        const ColumnsFields = [
            {
                dataField: 'Name',
                text: 'Название объекта',
                headerStyle: (colum, colIndex) => {
                    return {width: 200, textAlign: 'center'};
                }
            }, {
                dataField: 'Quantity',
                text: 'Количество',
                headerStyle: (colum, colIndex) => {
                    return {width: 200, textAlign: 'center'};
                }
            }, {
                dataField: 'Unit',
                text: 'Единицы измерения',
                headerStyle: (colum, colIndex) => {
                    return {width: 100, textAlign: 'center'};
                }
            }, {
                dataField: 'Fact',
                text: 'Факт выполнения',
                headerStyle: (colum, colIndex) => {
                    return {width: 200, textAlign: 'center'};
                }
            }
        ];



        const indication = () => {
            return "В таблице нет информации";
        }

        return (

            <div id="grayBackgroundDiv">
                <div id="cardOfProviderDiv">

                    <button className="buttonClose button7" onClick={() => {
                        this.props.closeWindowPortal();
                    }}>
                        Закрыть
                    </button>


                    <div className="blockDiv">
                        <div className="headerCardOfProvider" align="center">
                            Список объектов для оборудования "{this.props.selectedRowNomGroupName}"
                        </div>

                        <h2 align={'center'}>Расшифровка:</h2>
                        <h5 align={'center'}>({this.props.selectedRowHardwareModel})</h5>

                        <ToolkitProvider
                            keyField={"tableID"}
                            data={this.state.data}
                            columns={ColumnsFields}
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
                                        {...props.baseProps}
                                    />

                                )
                            }

                        </ToolkitProvider>
                {/*            {this.state.documentInsertModal === true &&*/}
                {/*            <InsertNewDocumentModalComponent/>*/}


                {/*            }*/}
                {/*        </div>*/}

                    </div>
                </div>
            </div>
        )
    }
}

export default SelectPkuByDeliveryIdComponent;