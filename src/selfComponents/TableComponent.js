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

// const keyTypes = {
//     "ОМТС": "DeliveryID",
//     "Монтажники1": "WorkID",
//     "Монтажники2": "WorksNomGroupID",
//     "ПТО1": "WorkID",
//     "ПТО2": "WorksNomGroupID",
//     "Отчеты1": "SubjectID",
//     "Отчеты2": "SubjectID",
// }


class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            pkuInfo: [],
        };
        this.url = window.location.href;
    }




    async fetchFromApi(apiRoute, idPKU) {                                   // функция подгрузки данных для таблиц, на вход принимает
        await fetch(`${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
           // console.log(`/api/pkuDataServerPKUTable${idPKU}`);              // apiRoute - api адрес, откуда нужно получить данные
           // console.log(results);
            return results.json();
        }).then(
            data => {
                let pkuInfoWithID = data.map((val, ix) => {
                    val.tableID = ix+1;
                    // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
                    return val;
                });
                // console.log(data);
                this.setState({
                    pkuInfo: pkuInfoWithID,
            });

            // console.log(this.state.pkuInfo);
            // console.log(Object.keys(data.rows[0])[0]);
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

    async uploadData(rowEdit, newV, column) {
        // console.log('Зашел');
        // console.log(rowEdit);
        // console.log(newV);
        // console.log(column);

        switch (this.props.typeTable) {
            case "ОМТС":
                this.fetchOnApi('/api/pkuDataServerPKUTable/OMTS/', this.props.idPKU, rowEdit);
                break;
            case "Монтажники1":
                this.fetchOnApi('/api/pkuDataServerPKUTable/Montazhniki/Montazhniki1/', this.props.idPKU, rowEdit);
                break;
            case "ПТО1":
                this.fetchOnApi('/api/pkuDataServerPKUTable/PTO/PTO1/', this.props.idPKU, rowEdit);
                break;
            case "ПТО2":
                this.fetchOnApi('/api/pkuDataServerPKUTable/PTO/PTO2/', this.props.idPKU, rowEdit);
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыаем таблицу
        if (nextProp.typeTable !== this.props.typeTable || nextProp.idPKU !== this.props.idPKU) {
            this.loadData(nextProp.idPKU, nextProp.typeTable);
            // this.fetchFromApi( nextProp.idPKU, nextProp.typeTable);
        }

    }

    async fetchOnApi(apiRoute, idPKU, rowEdit) {
        // console.log(window.location.href);
        // console.log(JSON.stringify(rowEdit));
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        await fetch(`http://127.0.0.1:5000${apiRoute}${idPKU}`, {
        // await fetch(`${proxyurl}`+'http://127.0.0.1:5000/api/test1', {
        // await fetch('http://127.0.0.1:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            // mode:"no-cors",
            body:JSON.stringify(rowEdit),
            // body:rowEdit,
            // body: JSON.stringify(this.state.pkuInfo),
            // cache: "no-cache",
            // proxy: "http://localhost:5000",
        }).then(results => {
            // console.log(`http://127.0.0.1:5000${apiRoute}${idPKU}`);
            // console.log(results);
            // console.log(rowEdit);
            return results.json();
        }).then(data => {
            console.log(data);
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}${idPKU}`);
        });

        // await fetch(`http://127.0.0.1:5000${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
        //     console.log(`ТЕСТ`);
        //     return results.json();
        // }).then(
        //     data => {
        //         console.log(data);
        //     }).catch(() => {
        //     console.log(`Ошибка при выполнении запроса с http://127.0.0.1:5000${apiRoute}${idPKU}`);
        // });
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


        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                Показано с { from } по { to } из { size }
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
                text: 'Все', value: this.state.pkuInfo.length
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
            // style.borderTop = 'none';
            // style.height = '70';
            return style;
        };

        const indication = () => {
            return "В таблице нет информации";
        }
        // const indication = "В таблице нет информации";

        return (
            <div id="TableComp">
                {this.props.show &&
                <div>
                    <ToolkitProvider
                        keyField={"tableID"}
                        data={this.state.pkuInfo }
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
                                        headerClasses="thead"
                                        bodyClasses="tbody"
                                        // rowStyle={rowStyle}
                                        noDataIndication={ indication }
                                        pagination={paginationFactory(optionsPagination)}
                                        cellEdit={cellEditFactory({
                                            mode: 'dbclick',
                                            blurToSave: true,
                                            beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                this.uploadData(row, newValue, column);
                                            }
                                        })}
                                        // filter={filterFactory()}
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
