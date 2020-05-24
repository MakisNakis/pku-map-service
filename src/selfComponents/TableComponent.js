import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './css/TableComponent.css';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


function rowClassNameFormat(row, rowIdx) {
    // console.log(row);
    return row['name'] === 'George Michael' ?
        'GeorgeMichael-Row' : 'Other-Row';
}

function getData() {
    var data = []
    for (var i = 0; i < 100; ++i) {
        data[i] = {id: i, name: 'item_' + i, value: i}
    }

    return data
}


function showTotal() {
    return <p>There are 100 items total</p>
}

class TableComponent extends Component {
    render() {
        const options = {
            page: 4,
            prePage:  '⟵',
            nextPage: '⟶',
            firstPage: '⟸',
            lastPage: '⟹',
            paginationShowsTotal: showTotal
        }
        const cellEditProp = {
            mode: 'dbclick',
            nonEditableRows: function () {
                return [3];
            }
        }
        return (
            <div id="TableComp">
                <BootstrapTable data={getData()}
                                trClassName={rowClassNameFormat}
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
        );
    }
}

export default TableComponent;
