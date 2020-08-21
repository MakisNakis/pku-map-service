import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit';
import {ColumnsData} from "../data/ColumnsData";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';


import './css/TableComponent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { SearchBar } = Search;
// let performers = [{label: "1"}, {label:"2"}, {label: "3"}]

class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            pkuInfo: [],
            filterColor: "white",
            // performers: [] // список всех исполнителей (монтажников)
        };
        this.url = window.location.href;
        this.copyPkuInfo = [];

    }


     async fetchFromApi(apiRoute, idPKU) {                                         // функция подгрузки данных для таблиц, на вход принимает
         await fetch(`${this.url}${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
            // console.log(`/api/pkuDataServerPKUTable${idPKU}`);                  // apiRoute - api адрес, откуда нужно получить данные
            console.log(results);
             return results.json();
         }).then(
             data => {
                 console.log(data);
                 let pkuInfoWithID = data.map((val, ix) => {
                     val.tableID = ix+1;
                     // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
                     return val;
                 });
                 // console.log(data);
                 this.setState({
                     pkuInfo: pkuInfoWithID,
                     filterColor: "white",

                 });
                 this.copyPkuInfo = this.state.pkuInfo;

             // console.log(this.state.pkuInfo);
             // console.log(Object.keys(data.rows[0])[0]);
         }).catch(() => {
             console.log(`Ошибка при выполнении запроса с ${apiRoute}${idPKU}`);
         });

     }


    async loadData(idPKU, typeTable, nextPropRouteNumber) { // функция для выгрузки соотвествующих для отдела depName данных
        // if (nextPropRouteNumber === 2) {
            switch (typeTable) {
                case "ОМТС":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/OMTS/`, idPKU);
                    break;
                case "Монтажники1":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/Montazhniki/Montazhniki1/`, idPKU);
                    break;
                case "Монтажники2":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/Montazhniki/Montazhniki2/`, idPKU);
                    break;
                case "ПТО1":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/PTO/PTO1/`, idPKU);
                    break;
                case "ПТО2":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/PTO/PTO2/`, idPKU);
                    break;
                case "Отчеты1":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/Otchety/Otchety1/`, idPKU);
                    break;
                case "Отчеты2":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/Otchety/Otchety2/`, idPKU);
                    break;
                case "Логи":
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${nextPropRouteNumber}/Logs/`, idPKU);
                    break;
                default:
                    break;
            }

    }

    async uploadData(rowEdit) {
        // let userId = localStorage.getItem('userId')
        // console.log(userId)
        // if (this.props.routeNumber === 2) {
            switch (this.props.typeTable) {
                case "ОМТС":
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                    break;
                case "Монтажники1":
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/Montazhniki/Montazhniki1/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                    break;
                case "ПТО1":
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/PTO/PTO1/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                    break;
                case "ПТО2":
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/PTO/PTO2/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                    break;
                default:
                    break;
            }
        // }
        //
        // if (this.props.routeNumber === 3) {
        //     switch (this.props.typeTable) {
        //         case "ОМТС":
        //             this.fetchOnApi('/api/pkuDataServerPKUTable/3/OMTS/', this.props.idPKU, rowEdit, this.props.routeNumber);
        //             break;
        //         case "Монтажники1":
        //             this.fetchOnApi('/api/pkuDataServerPKUTable/3/Montazhniki/Montazhniki1/', this.props.idPKU, rowEdit, this.props.routeNumber);
        //             break;
        //         case "ПТО1":
        //             this.fetchOnApi('/api/pkuDataServerPKUTable/3/PTO/PTO1/', this.props.idPKU, rowEdit, this.props.routeNumber);
        //             break;
        //         case "ПТО2":
        //             this.fetchOnApi('/api/pkuDataServerPKUTable/3/PTO/PTO2/', this.props.idPKU, rowEdit, this.props.routeNumber);
        //             break;
        //         default:
        //             break;
        //     }
        // }
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыаем таблицу
        if (nextProp.typeTable !== this.props.typeTable || nextProp.idPKU !== this.props.idPKU || nextProp.routeNumber !== this.props.routeNumber) {
            // console.log(this.props.routeNumber)
            // console.log(nextProp.routeNumber)
            this.loadData(nextProp.idPKU, nextProp.typeTable, nextProp.routeNumber);
        }
    }

    async fetchOnApi(apiRoute, idPKU, rowEdit) {
        let jsonObj = {rowEdit: rowEdit, userId: localStorage.getItem('userId')}
        // console.log(window.location.href);
        console.log(rowEdit);
        await fetch(`${this.url}${apiRoute}${idPKU}`, {
        // await fetch('http://192.168.1.116:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            // credentials: 'same-origin',
            body: JSON.stringify(jsonObj),
            // cache: "no-cache",
        }).then(results => {
            // console.log(results);
            return results.json();
        }).then(data => {
            // console.log(data);
            this.fetchFromApi(apiRoute, idPKU) // вызываем для обновления полей таблицы после апдейта
        }).catch((err) => {
            console.log(`${err}. Ошибка при отправке запроса на ${apiRoute}${idPKU}`);
        });
    }

    cellStyle = (cell, row) => {
        const style = {};
        switch (this.props.typeTable) {
            case "Отчеты1":
                style.background = row.DatePlanColor;
                break;
            default:
                break;
        }
        return style;
    };



    render() {

        // const tableHeaders = loadPerformers(); // подключаем заголовки таблиц из файла ../data/ColumnsData
        const tableHeaders = ColumnsData(); // подключаем заголовки таблиц из файла ../data/ColumnsData
        const {ExportCSVButton} = CSVExport; // кнопка для экспорта таблицы в CSV



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
            firstPageText: 'Первая',
            prePageText: 'Предыдущая',
            nextPageText: 'Следующая',
            lastPageText: 'Последняя',
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
                style.backgroundColor = 'rgba(142,238,147,0.3)';
            }

            // style.borderTop = 'none';
            // style.height = '70';
            return style;
        };


        const indication = () => {
            return "В таблице нет информации";
        }
        // const indication = "В таблице нет информации";

        const cutData = (color) => {
            let newData = [];
            let lenMas = this.copyPkuInfo.length;

            // console.log(color);

            for (let i=0; i < lenMas; i++) {
                let obj = this.copyPkuInfo[i];
                for (let key in obj) {
                    if (obj[key] === color) {
                        newData.push(obj);
                        break;
                    }
                }
            }
            return newData;
        }

        const filterColor = () => {
            switch(this.state.filterColor) {
                case "white":
                    // console.log('###### ' + this.state.filterColor);
                    this.copyPkuInfo = this.state.pkuInfo;
                    this.setState({
                        filterColor: "yellow",
                        pkuInfo: cutData("yellow"),
                    });
                    break;
                case "yellow":
                    // console.log('###### ' + this.state.filterColor);

                    this.setState({
                        filterColor: "red",
                        pkuInfo: cutData("red"),
                    });
                    break;
                case "red":
                    // console.log('###### ' + this.state.filterColor);

                    this.setState({
                        filterColor: "white",
                        pkuInfo: this.copyPkuInfo,
                    });
                    break;
                default:
                    break;
            }
        }

        const MyExportCSV = (props) => {
            const handleClick = () => {
                props.onExport();
            };
            return (
                <button className="button9" onClick={ handleClick }>Экспортировать в CSV</button>
            );
        };


        return (
            <div id="TableComp" >
                {this.props.show &&
                <div>
                    <ToolkitProvider
                        keyField={"tableID"}
                        data={this.state.pkuInfo}
                        columns={tableHeaders[this.props.typeTable]}
                        search
                        exportCSV={{
                            fileName: 'таблица.csv'
                        }}
                    >
                        {
                            props => (
                                <div>
                                    <table>
                                        <tr>
                                    <td><MyExportCSV { ...props.csvProps } /></td>
                                    {/*<ExportCSVButton className={"button8"} {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>*/}
                                        <td>{this.props.depName === "Отчеты" && <button className="button9" style={{backgroundColor: this.state.filterColor}} onClick={filterColor}>Фильтр</button>}</td>
                                    {/*<br/>*/}
                                        <td ><SearchBar { ...props.searchProps } /></td>
                                    {/*<hr />*/}
                                        </tr>
                                    </table>
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
                                            // beforeSaveCell,
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                if (oldValue !== newValue) {
                                                    this.uploadData(row, newValue, column);
                                                }
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