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


    async loadData(idPKU, depName) {

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
        if(nextProp.depName !== this.props.depName || nextProp.idPKU !== this.props.idPKU) {
            console.log(nextProp.idPKU);
            console.log(nextProp.depName);
            this.loadData(nextProp.idPKU, nextProp.depName);
        }

    }

    componentWillMount() {
    }

    async onChangeTheTab(a){
       alert(a);
    }



    render() {

        var selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(206,255,198)"

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

        // function DeleteUserLink() {
        //     function onClick(e) {
        //         e.preventDefault();
        //         console.log('Пользователь был удален.');
        //     }
        //
        //     return (
        //         <a href="#" onClick={onClick}>Удалить пользователя</a>
        //     );
        // }


        console.log(this.props.idPKU);
        return (


            <div id="TableComp">
                {this.props.show &&
                    <div>

                        <p className="Table-header"><h2 align = "center">Перечень оборудования </h2></p>
                        <BootstrapTable data={this.state.pkuInfo}
                                        exportCSV={ true }
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

                            <TableHeaderColumn  dataField='WorkName' width = "50%"  tdStyle={ { whiteSpace: 'normal' } } >
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
                            <TableHeaderColumn isKey dataField='HardwareName' width = "40%" tdStyle={ { whiteSpace: 'normal' } } dataSort>
                                Название оборудования
                            </TableHeaderColumn>
                            {/*<TableHeaderColumn dataField='HardwareNamek' width = "40%" >*/}
                            {/*    Расшифровка оборудования*/}
                            {/*</TableHeaderColumn>*/}
                            <TableHeaderColumn dataField='HardwareQuantity'  width = "100px" tdStyle={ { whiteSpace: 'normal' } }>
                                Кол-во
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='HardwareUnit' width = "100px" tdStyle={ { whiteSpace: 'normal' } }>
                                Ед.Изм.
                            </TableHeaderColumn>

                            {/*<TableHeaderColumn dataField='HardwareComment'>*/}
                            {/*    HardwareComment*/}
                            {/*</TableHeaderColumn>*/}
                            <TableHeaderColumn dataField='StartDate' width = "140px" tdStyle={ { whiteSpace: 'normal' } }>
                                Начало работ
                            </TableHeaderColumn>

                            <TableHeaderColumn dataField='EndDate' width = "140px" tdStyle={ { whiteSpace: 'normal' } }>
                                Конец работ
                            </TableHeaderColumn>

                            <TableHeaderColumn dataField='HardwareComment' width = "200px" tdStyle={ { whiteSpace: 'normal' } }>
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
