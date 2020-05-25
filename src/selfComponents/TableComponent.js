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
        let data = [];
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

    //
    render() {



        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(126,238,80)"

        };

        const options = {
            // size: "sm",
            page: 4,
            prePage:  '⟵',
            nextPage: '⟶',
            firstPage: '⟸',
            lastPage: '⟹',
        };

        const cellEditProp = {
            mode: 'dbclick',
            // nonEditableRows: function () {      // не работает
            //     return [1];
            // }
        };

        console.log(this.props.idPKU);
        return (
            <div id="TableComp">
                {this.props.show &&
                    <div>
                        <p className="Table-header"><h2 align = "center">Перечень оборудования </h2></p>
                        <BootstrapTable data={this.state.pkuInfo}
                                        exportCSV={ true }
                                        table-reflow
                                        pagination={true}
                                        options={options}
                                        cellEdit={cellEditProp}
                                        selectRow={selectRowProp}
                                        striped
                                        hover
                                        condensed
                                        insertRow
                                        deleteRow
                                        search
                                        responsive
                        >
                            {/*<TableHeaderColumn isKey dataField='HardwareID'>*/}
                            {/*    HardwareID*/}
                            {/*</TableHeaderColumn>*/}
                            <TableHeaderColumn isKey dataField='WorkName'  >
                                Наименование работы
                            </TableHeaderColumn>
                            {/*<TableHeaderColumn width = "380px" dataField='WorkType'>*/}
                            {/*    Тип работы*/}
                            {/*</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn dataField='WorkUnit'>*/}
                            {/*    WorkUnit*/}
                            {/*</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn dataField='WorkQuantity'>*/}
                            {/*    WorkQuantity*/}
                            {/*</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn dataField='WorkComment'>*/}
                            {/*    WorkComment*/}
                            {/*</TableHeaderColumn>*/}
                            <TableHeaderColumn dataField='HardwareName' width = "50%" >
                                Название оборудования
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='HardwareQuantity'  width = "100px">
                                Кол-во
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='HardwareUnit' width = "100px">
                                Ед.Изм.
                            </TableHeaderColumn>

                            {/*<TableHeaderColumn dataField='HardwareComment'>*/}
                            {/*    HardwareComment*/}
                            {/*</TableHeaderColumn>*/}
                            <TableHeaderColumn dataField='StartDate' width = "130px">
                                Начало работ
                            </TableHeaderColumn>

                            <TableHeaderColumn dataField='EndDate' width = "130px">
                                Конец работ
                            </TableHeaderColumn>

                            <TableHeaderColumn dataField='HardwareComment' width = "200px">
                                Комментарий
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
