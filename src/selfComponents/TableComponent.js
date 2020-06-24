import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit';
import {ColumnsData} from "../data/ColumnsData";

import './css/TableComponent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            pkuInfo: []
        };
    }

    async fetchFromApi(apiRoute, idPKU) {                                   // функция подгрузки данных для таблиц, на вход принимает
        await fetch(`${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
            console.log(`/api/pkuDataServerPKUTable${idPKU}`);              // apiRoute - api адрес, откуда нужно получить данные
            return results.json()
        }).then(data => {
            this.setState({pkuInfo: data.rows});
            // console.log(this.state.pkuData[0].ID)
        }).catch(() => {
            console.log(`Ошибка при выполнении запроса с ${apiRoute}${idPKU}`);
        });
    }


    async loadData(idPKU, depName) { // функция для выгрузки соотвествующих для отдела depName данных
        switch (depName) {
            case "ОМТС":
                this.fetchFromApi('/api/pkuDataServerPKUTable', idPKU);
                break;
            case "Монтажники":
                this.fetchFromApi('/api/pkuDataServerPKUTable', idPKU);
                break;
            case "ПТО":
                this.fetchFromApi('/api/pkuDataServerPKUTable', idPKU);
                break;
            case "Отчеты":
                this.fetchFromApi('/api/pkuDataServerPKUTable', idPKU);
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыает таблицу
        if (nextProp.depName !== this.props.depName || nextProp.idPKU !== this.props.idPKU) {
            // console.log(nextProp.idPKU);
            // console.log(nextProp.depName);
            this.loadData(nextProp.idPKU, nextProp.depName);
        }

    }


    render() {

        const tableHeaders = ColumnsData(); // подключаем заголовки таблиц из файла ../data/ColumnsData
        const {ExportCSVButton} = CSVExport; // кнопка для экспорта таблицы в CSV


        const options = {
            // size: "sm",
            page: 4,
            prePage: '⟵',
            nextPage: '⟶',
            firstPage: '⟸',
            lastPage: '⟹',
        };

        let selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(206,255,198)"

        };

        const cellEditProp = {
            mode: 'dbclick',
            // nonEditableRows: function () {      // не работает
            //     return [1];
            // }
        };

        const rowStyle = (row, rowIndex) => {
            row.index = rowIndex;
            const style = {};
            if (rowIndex % 2 === 0) {
                style.backgroundColor = 'transparent';
            } else {
                style.backgroundColor = 'rgba(142,238,147,0.13)';
            }
            style.borderTop = 'none';

            return style;
        };

        return (
            <div id="TableComp">
                {this.props.show && this.props.depName === "Отчеты" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования
                        на {this.props.markerName} </h2></p>

                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["Отчеты"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>
                                    <hr/>
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </div>
                            )
                        }
                    </ToolkitProvider>

                </div>
                }

                {this.props.show && this.props.depName === "ОМТС" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования
                        на {this.props.markerName} </h2></p>
                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["ОМТС"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>
                                    <hr/>
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
                }


                {this.props.show && this.props.depName === "Монтажники" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования
                        на {this.props.markerName}  </h2></p>
                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["Монтажники"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>
                                    <hr/>
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
                }

                {this.props.show && this.props.depName === "ПТО" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования
                        на {this.props.markerName}  </h2></p>

                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["ПТО"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>
                                    <hr/>
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </div>
                            )
                        }
                    </ToolkitProvider>

                </div>
                }
                <p>{!this.props.hide}</p>


            </div>
        );
    }
}

export default TableComponent;
