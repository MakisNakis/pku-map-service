import React, { Component } from 'react';
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

// import './css/CardOfProviderComponent.css';

class CardOfProviderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataAboutProvider: [],
        }
        // this.obj
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
                dataAboutProvider: data,
            });
        }).catch((err) => {
            console.log(err, "cardOfProviders");
        });
    }

    componentDidMount() {
        this.fetchFromProviderApi(this.props.selectedRowDeliveryId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.dataAboutProvider !== prevState.dataAboutProvider) {
            console.log(this.state.dataAboutProvider);
        }
    }


    render() {

        const columnsFields = [
        {
            dataField: 'Name',
            text: 'Название',
            headerStyle: (colum, colIndex) => {
                return {width: 200, textAlign: 'center'};
            }
        }, {
            dataField: 'Contact',
            text: 'Адрес',
            headerStyle: (colum, colIndex) => {
                return {width: 200, textAlign: 'center'};
            }
        }, {
            dataField: 'INN',
            text: 'ИНН',
            headerStyle: (colum, colIndex) => {
                return {width: 100, textAlign: 'center'};
            }
        }, {
            dataField: 'UserName',
            text: 'Пользователь',
            headerStyle: (colum, colIndex) => {
                return {width: 200, textAlign: 'center'};
            }
        }, {
            dataField: 'DateUp',
            text: 'Дата внесения изменений',
            headerStyle: (colum, colIndex) => {
                return {width: 150, textAlign: 'center'};
            }
        }];

        return (
            <div>
                <h1>Provider ID: {this.props.selectedProviderId}</h1>

                {this.state.dataAboutProvider !== null && <BootstrapTable
                    keyField={"tableID"}
                    data={this.state.dataAboutProvider}
                    columns={columnsFields}
                />}

                <button onClick={() => this.props.closeWindowPortal()} >
                    Close me!
                </button>
            </div>
        )
    }
}

export default CardOfProviderComponent;