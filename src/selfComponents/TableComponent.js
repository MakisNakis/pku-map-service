import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './css/TableComponent.css';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            pkuInfo: []
        };
    }

    getData() {
        let data = []
        for (let i = 0; i < 100; ++i) {
            data[i] = {id: i, name: 'item_' + i, value: i}
        }
        // console.log(this.state.pkuInfo);

        return data;
    }

    async loadData(idPKU) {
        console.log('!!!!!!!!!');
        await fetch(`/api/pkuDataServerPKUTable${idPKU}`).then(results => {
            console.log(`/api/pkuDataServerPKUTable${idPKU}`);
            return results.json()
        }).then(data => {
            this.setState({pkuInfo: data.rows});
            // console.log(this.state.pkuData[0].ID)
        }).catch(() => {
            console.log(`aaaaaaaaaaaaaa`);
        });
        console.log(this.state.pkuInfo);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.idPKU !== undefined) {
            console.log(nextProp.idPKU);
            this.loadData(nextProp.idPKU);
        }

    }

    componentWillMount() {
        this.getData();
    }

    render() {

        const options = {
            page: 4,
            prePage:  '⟵',
            nextPage: '⟶',
            firstPage: '⟸',
            lastPage: '⟹',
        }

        const cellEditProp = {
            mode: 'dbclick',
            // nonEditableRows: function () {      // не работает
            //     return [1];
            // }
        }
        console.log(this.props.idPKU);
        return (
            <div id="TableComp">
                {this.props.show &&
                    <div>
                        <p className="Table-header">Basic Table</p>
                        <BootstrapTable data={this.pkuInfo}
                                        pagination={true}
                                        options={options}
                                        cellEdit={cellEditProp}
                        >
                            <TableHeaderColumn isKey dataField='id'>
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='value'>
                                Value
                            </TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                }
                <p>{this.props.hide}</p>
            </div>
        );
    }
}

export default TableComponent;
