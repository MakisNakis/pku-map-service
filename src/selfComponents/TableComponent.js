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
           // console.log(`/api/pkuDataServerPKUTable${idPKU}`);              // apiRoute - api адрес, откуда нужно получить данные
            return results.json()
        }).then(data => {
            this.setState({pkuInfo: data.rows});
            console.log(this.state.pkuInfo)
        }).catch(() => {
            console.log(`Ошибка при выполнении запроса с ${apiRoute}${idPKU}`);
        });
    }


    async loadData(idPKU, /*depName, */typeTable) { // функция для выгрузки соотвествующих для отдела depName данных
        switch (typeTable) {
            case "ОМТС":
                this.fetchFromApi('/api/pkuDataServerPKUTable/OMTS/', idPKU);
                break;
            case "Монтажники1":
                this.fetchFromApi('/api/pkuDataServerPKUTable/Montazhniki/Montazhniki1/', idPKU);
                break;
            case "Монтажники2":
                this.fetchFromApi('/api/pkuDataServerPKUTable/Montazhniki/Montazhniki2/', idPKU);
                break;
            case "ПТО1":
                this.fetchFromApi('/api/pkuDataServerPKUTable/PTO/PTO1/', idPKU);
                break;
            case "ПТО2":
                this.fetchFromApi('/api/pkuDataServerPKUTable/PTO/PTO2/', idPKU);
                break;
            case "Отчеты1":
                this.fetchFromApi('/api/pkuDataServerPKUTable/Otchety/Otchety1/', idPKU);
                break;
            case "Отчеты2":
                this.fetchFromApi('/api/pkuDataServerPKUTable/Otchety/Otchety2/', idPKU);
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыает таблицу
        if (nextProp.typeTable !== this.props.typeTable || nextProp.idPKU !== this.props.idPKU) {
            // console.log(nextProp.idPKU);
            // console.log(nextProp.depName);
            // this.loadData(nextProp.idPKU, nextProp.depName);
            this.loadData(nextProp.idPKU, nextProp.typeTable);
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

        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Showing { from } to { to } of { size } Results
            </span>
        );

        const optionsPagination = {
            paginationSize: 5,
            pageStartIndex: 1,
            // alwaysShowAllBtns: true, // Always show next and previous button
            // withFirstAndLast: false, // Hide the going to First and Last page button
            // hideSizePerPage: true, // Hide the sizePerPage dropdown always
            // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '100', value: 100
            }, {
                text: 'All', value: this.state.pkuInfo.length
            }] // A numeric array is also available. the purpose of above example is custom the text
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
            // style.height = '70';
            return style;
        };

        return (
            <div id="TableComp">
                {this.props.show &&
                <div>
                    <ToolkitProvider
                        keyField="HardwareID"
                        data={this.state.pkuInfo}
                        columns={tableHeaders[this.props.typeTable]}
                        exportCSV
                    >
                        {
                            props => (
                                <div>
                                    <ExportCSVButton {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>
                                    <hr/>
                                    <BootstrapTable
                                        wrapperClasses="table-horiz-scroll"
                                        rowStyle={rowStyle}
                                        pagination={paginationFactory(optionsPagination)}
                                        cellEdit={cellEditFactory({mode: 'dbclick'})}
                                        filter={filterFactory()}
                                        {...props.baseProps}
                                    />
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
