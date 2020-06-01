import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';

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


    async loadData(idPKU, depName) {

        switch (depName) {
            case "ОМТС":
                await fetch(`/api/pkuDataServerPKUTable${idPKU + 2}`).then(results => {
                    console.log(`/api/pkuDataServerPKUTable${idPKU}`);
                    return results.json()
                }).then(data => {
                    this.setState({pkuInfo: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`aaaaaaaaaaaaaa`);
                });
                break;
            case "Монтажники":
                await fetch(`/api/pkuDataServerPKUTable${idPKU + 1}`).then(results => {
                    console.log(`/api/pkuDataServerPKUTable${idPKU}`);
                    return results.json()
                }).then(data => {
                    this.setState({pkuInfo: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`aaaaaaaaaaaaaa`);
                });
                break;
            case "ПТО":
                await fetch(`/api/pkuDataServerPKUTable${idPKU + 3}`).then(results => {
                    console.log(`/api/pkuDataServerPKUTable${idPKU}`);
                    return results.json()
                }).then(data => {
                    this.setState({pkuInfo: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`aaaaaaaaaaaaaa`);
                });
                break;

            case "Отчеты":
                await fetch(`/api/pkuDataServerPKUTable${idPKU}`).then(results => {
                    console.log(`/api/pkuDataServerPKUTable${idPKU}`);
                    return results.json()
                }).then(data => {
                    this.setState({pkuInfo: data.rows});
                    // console.log(this.state.pkuData[0].ID)
                }).catch(() => {
                    console.log(`aaaaaaaaaaaaaa`);
                });
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.depName !== this.props.depName || nextProp.idPKU !== this.props.idPKU) {
            console.log(nextProp.idPKU);
            console.log(nextProp.depName);
            this.loadData(nextProp.idPKU, nextProp.depName);
        }

    }

    componentWillMount() {
    }

    async onChangeTheTab(a) {
        alert(a);
    }


    render() {

        let selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(206,255,198)"

        };

        let tableHeaders = [];
        tableHeaders["ОМТС"] = [{
            dataField: 'WorkName',
            text: 'Наименование работы',
            headerStyle: (colum, colIndex) => {
                return { width: '30%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareName',
            text: 'Название оборудования',
            headerStyle: (colum, colIndex) => {
                return { width: '30%', textAlign: 'center' };
            }
        },  {
            dataField: '',
            text: 'Расшифровка наименования',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        },  {
            dataField: '',
            text: 'Расшифровка (согласованная)',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        },  {
            dataField: '',
            text: 'Дата согласования',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата размещения в производство',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        },  {
            dataField: '',
            text: 'Дата поставки',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        },{
            dataField: 'HardwareQuantity',
            text: 'Количество',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareUnit',
            text: 'Единицы измерения',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        },{
            dataField: 'StartDate',
            text: 'Начало работ',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: 'EndDate',
            text: 'Конец работ',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareComment',
            text: 'Комментарий',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }];

        tableHeaders["Монтажники"] = [{
            dataField: 'WorkName',
            text: 'Наименование работы',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }

        }, {
            dataField: 'HardwareName',
            text: 'Название оборудования',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Расшифровка (согласованная)',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата поставки',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareQuantity',
            text: 'Количество',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareUnit',
            text: 'Единицы измерения',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        },{
            dataField: 'StartDate',
            text: 'Начало работ',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: 'EndDate',
            text: 'Конец работ',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Исполнитель',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата выполнения',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareComment',
            text: 'Комментарий',
            headerStyle: (colum, colIndex) => {
                return { textAlign: 'center' };
            }
        } ];


        tableHeaders["ПТО"] = [{
            dataField: 'WorkName',
            text: 'Наименование работы',
            headerStyle: (colum, colIndex) => {
                return { width: '40%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareName',
            text: 'Название оборудования',
            headerStyle: (colum, colIndex) => {
                return { width: '40%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Расшифровка (согласованная)',
            headerStyle: (colum, colIndex) => {
                return { width: '30%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата поставки',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareQuantity',
            text: 'Кол-во',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareUnit',
            text: 'Ед.изм.',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        },{
            dataField: 'StartDate',
            text: 'Начало работ',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: 'EndDate',
            text: 'Конец работ',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Исполнитель',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата выполнения',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Закрытие по актам',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Подтвержд. монтажа',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Списание материалов',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        }, {
            dataField: 'HardwareComment',
            text: 'Комментарий',
            headerStyle: (colum, colIndex) => {
                return { width: '25%', textAlign: 'center' };
            }
        } ];

        tableHeaders["Отчеты"] = [{
            dataField: 'WorkName',
            text: 'Наименование работы',
            headerStyle: (colum, colIndex) => {
                return { width: '30%', textAlign: 'center' };
            }

        }, {
            dataField: 'HardwareName',
            text: 'Название оборудования',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Расшифровка (согласованная)',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }

            }, {
            dataField: '',
            text: 'Дата размещения в производство',
            headerStyle: (colum, colIndex) => {
                return { width: '18%', textAlign: 'center' };
            }
        },  {
            dataField: '',
            text: 'Дата поставки',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        },  {
            dataField: 'StartDate',
            text: 'Начало работ',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: 'EndDate',
            text: 'Конец работ',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Исполнитель монтажа',
            headerStyle: (colum, colIndex) => {
                return { width: '18%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Дата выполнения',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Комментарий исполнителя монтажа',
            headerStyle: (colum, colIndex) => {
                return { width: '20%', textAlign: 'center' };
            }
        }, {
            dataField: '',
            text: 'Факт закрытия по актам',
            headerStyle: (colum, colIndex) => {
                return { width: '15%', textAlign: 'center' };
            }
        } ];

        const options = {
            // size: "sm",
            page: 4,
            prePage: '⟵',
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


        const { ExportCSVButton } = CSVExport;



        console.log(this.props.idPKU);
        return (

            <div id="TableComp">
                {this.props.show && this.props.depName === "Отчеты" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования на {this.props.markerName} </h2></p>

                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["Отчеты"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton { ...props.csvProps }>Экспортировать в CSV</ExportCSVButton>
                                    <hr />
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={ filterFactory() }
                                        { ...props.baseProps } />
                                </div>
                            )
                        }
                    </ToolkitProvider>

                </div>
                }
                <p>{this.props.hide}</p>

                {this.props.show && this.props.depName === "ОМТС" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования на {this.props.markerName} </h2></p>
                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["ОМТС"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton { ...props.csvProps }>Экспортировать в CSV</ExportCSVButton>
                                    <hr />
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={ filterFactory() }
                                        { ...props.baseProps } />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
                }

                <p>{this.props.hide}</p>

                {this.props.show && this.props.depName === "Монтажники" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования на {this.props.markerName}  </h2></p>
                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["Монтажники"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton { ...props.csvProps }>Экспортировать в CSV</ExportCSVButton>
                                    <hr />
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={ filterFactory() }
                                        { ...props.baseProps } />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
                }
                <p>{this.props.hide}</p>

                {this.props.show && this.props.depName === "ПТО" &&
                <div>
                    <p className="Table-header"><h2 align="center">Перечень оборудования на {this.props.markerName}  </h2></p>

                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders["ПТО"]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton { ...props.csvProps }>Экспортировать в CSV</ExportCSVButton>
                                    <hr />
                                    <BootstrapTable
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory()}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={ filterFactory() }
                                        { ...props.baseProps } />
                                </div>
                            )
                        }
                    </ToolkitProvider>

                </div>
                }
                <p>{this.props.hide}</p>


            </div>
        );
    }
}

export default TableComponent;
