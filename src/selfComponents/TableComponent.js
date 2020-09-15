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
            // performers: this.getPerformers() // список всех исполнителей (монтажников)
        };
        this.url = window.location.href;
        this.copyPkuInfo = [];
        this.performers = [];
        this.factOfAgreement = [];
    }

    componentWillMount() {
        this.getPerformers()
            .then(data => {
                this.performers = data;
            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для чтения исполнителей");
            });
        this.getFactOfAgreement()
            .then(data => {
                this.factOfAgreement = data;
            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для чтения факта согласования");
            });
    }

    async getPerformers() {
        const performers = [];
        const performersMas = await fetch('/api/auth/perfName')
            .then(result => result.json())
            .then(data => {
            // console.log(data.rows);
            const lenMas = data.rows.length;
            for( let i = 0; i < lenMas; i++) {
                performers[i] = {
                    label: data.rows[i].Name,
                    value: data.rows[i].ID
                }
            }
            console.log(performers);
            return performers;
        }).catch(() => {
            console.log('Ошибка на /api/auth/perfName');
        });
        console.log(performersMas);
        return performersMas;
    }

    async getFactOfAgreement() {
        const factOfAgreement = [];
        const factOfAgreementMas = await fetch('/api/auth/factOfAgreement')
            .then(result => result.json())
            .then(data => {
                // console.log(data.rows);
                const lenMas = data.rows.length;
                for(let i = 0; i < lenMas; i++) {
                    factOfAgreement[i] = {
                        label: data.rows[i].Text,
                        value: data.rows[i].Bool
                    }
                }
                console.log(factOfAgreement);
                return factOfAgreement;
            }).catch(() => {
                console.log('Ошибка на /api/auth/factOfAgreement');
            });
        console.log(factOfAgreementMas);
        return factOfAgreementMas;
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

    async uploadData(rowEdit, newValue, oldValue) {

        let done = true;
        let factOfAgreementLen = this.factOfAgreement.length;
        let performersLen = this.performers.length;
        // for(let i = 0; i < factOfAgreementLen; i++) {
        //     console.log(this.factOfAgreement[i].label);
        //
        //     if (this.factOfAgreement[i].label === oldValue && newValue === "") {
        //         console.log("!!!");
        //         done = false;
        //     }
        // }
        switch (this.props.typeTable) {
            case "ОМТС": {
                if (rowEdit.Fact === '' || rowEdit.FactDoc === '') {
                    done = false;
                }
                console.log(rowEdit);

                if (done) {
                    for(let j = 0; j < factOfAgreementLen; j++) {

                        let factOfAgreementJ = this.factOfAgreement[j];
                        switch (factOfAgreementJ.label) {
                            case rowEdit.Fact: {
                                rowEdit.Fact = factOfAgreementJ.value;
                                break;
                            }
                            case rowEdit.FactDoc: {
                                rowEdit.FactDoc = factOfAgreementJ.value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                } else {
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU);
                }
                break;
            }
            case "Монтажники1": {
                console.log(rowEdit.PerformerName)
                if (rowEdit.Fact === '') {
                    done = false;
                }
                console.log(rowEdit.Fact);

                if (done) {
                    for (let j = 0; j < factOfAgreementLen; j++) {
                        let factOfAgreementJ = this.factOfAgreement[j];
                        switch (factOfAgreementJ.label) {
                            case rowEdit.Fact: {
                                rowEdit.Fact = factOfAgreementJ.value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    for (let j = 0; j < performersLen; j++) {
                        let performersLenJ = this.performers[j];
                        switch (performersLenJ.label) {
                            case rowEdit.PerformerName: {
                                rowEdit.PerformerName = performersLenJ.value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/Montazhniki/Montazhniki1/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                } else {
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/Montazhniki/Montazhniki1/`, this.props.idPKU);
                }
                break;
            }
            case "ПТО1": {
                if (rowEdit.Fact === '') {
                    done = false;
                }
                console.log(rowEdit.Fact);

                if (done) {
                    for (let j = 0; j < factOfAgreementLen; j++) {
                        let factOfAgreementJ = this.factOfAgreement[j];
                        switch (factOfAgreementJ.label) {
                            case rowEdit.Fact: {
                                rowEdit.Fact = factOfAgreementJ.value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    for (let j = 0; j < performersLen; j++) {
                        let performersLenJ = this.performers[j];
                        switch (performersLenJ.label) {
                            case rowEdit.PerformerName: {
                                rowEdit.PerformerName = performersLenJ.value;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/PTO/PTO1/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                } else {
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/PTO/PTO1/`, this.props.idPKU);
                }
                break;
            }

            case "ПТО2": {
                this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/PTO/PTO2/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                break;
            }
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProp) { // если получаем новые пропсы, то перерисовыаем таблицу
        if (nextProp.typeTable !== this.props.typeTable || nextProp.idPKU !== this.props.idPKU || nextProp.routeNumber !== this.props.routeNumber) {
            this.loadData(nextProp.idPKU, nextProp.typeTable, nextProp.routeNumber);
        }
    }

    async fetchOnApi(apiRoute, idPKU, rowEdit) {
        let jsonObj = {rowEdit: rowEdit, userId: localStorage.getItem('userId')}
        console.log(rowEdit);
        await fetch(`${this.url}${apiRoute}${idPKU}`, {
        // await fetch('http://192.168.1.116:5000/api/test1', {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(jsonObj),
        }).then(results => {
            return results.json();
        }).then(data => {
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
        const tableHeaders = ColumnsData(this.performers, this.factOfAgreement); // подключаем заголовки таблиц из файла ../data/ColumnsData
        console.log(this.performers);
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

        const beforeSaveCell = (oldValue, newValue, row, column, done) => {
            setTimeout(() => {
                console.log(oldValue);
                console.log(newValue);
                let factOfAgreementLen = this.factOfAgreement.length;
                for(let i = 0; i < factOfAgreementLen; i++) {
                    console.log(this.factOfAgreement[i].label);

                    if (this.factOfAgreement[i].label === oldValue && newValue === "") {
                        console.log("!!!");
                        done(false);
                    }
                }
                done(true);
            }, 0);
            return { async: true };
        }

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
                                            // blurToSave: true,
                                            beforeSaveCell,
                                            afterSaveCell: (oldValue, newValue, row, column) => {

                                                if (oldValue !== newValue) {
                                                    this.uploadData(row, newValue, oldValue);
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

                <p className={"messageStyle"} align={"center"}>{this.props.hide}</p>


            </div>
        );
    }
}
export default TableComponent;