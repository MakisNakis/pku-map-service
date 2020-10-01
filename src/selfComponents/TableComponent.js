import React, {Component, createRef} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit';
import {ColumnsData} from "../data/ColumnsData";
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import ModalWindow from './ModalWindow';
import CardOfProviderComponent from './CardOfProviderComponent';

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
            selectedRowDeliveryId: null,
            selectedRowProvider: null,
            selectedProviderId: null,
            showWindowPortal: false,
            modalWindowFocus: false,        // переменная, отвечающая за переведение фокуса на модальное окно
            // performers: this.getPerformers() // список всех исполнителей (монтажников)
        };
        // переменная, для запуска приложения с разных ip
        this.url = window.location.href;
        // this.modalWindowRef = createRef();
        // копия данных таблиц, использующаяся для раскраски в таблице отчетов
        this.copyPkuInfo = [];

        this.performers = [];
        this.factOfAgreement = [];
        this.providersList = [];

        this.handleClick = this.handleClick.bind(this);
        this.splitDelivery = this.splitDelivery.bind(this);
        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
        this.closeWindowPortal = this.closeWindowPortal.bind(this);
        this.modalWindowFocusOn = this.modalWindowFocusOn.bind(this);
        this.modalWindowFocusOff = this.modalWindowFocusOff.bind(this);
    }

    componentDidMount() {
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

        this.getProvidersList()
            .then(data => {
                this.providersList = data;
                console.log(this.providersList)

            })
            .catch(() => {
                console.log("Ошибка при асинхронном запросе для чтения списка контрагентов");
            });


        window.addEventListener('beforeunload', () => {
            this.closeWindowPortal();
        });
    }

    async toggleWindowPortal(e, data) {
        delete data.target;
        let perfMasLen = this.providersList.length;
        let providerId = null;
        for (let i = 0; i < perfMasLen; i++) {
            if (data.nameOfProvider === this.providersList[i].label) {
                providerId = this.providersList[i].value;
            }
        }
        console.log(providerId)
        this.setState(state => ({
            ...state,
            selectedProviderId: providerId,
            showWindowPortal: true
        }));
    }

    modalWindowFocusOn(e, data) {
        this.toggleWindowPortal(e, data).then(() => {
            this.setState({
                modalWindowFocus: true
            });
        });
    }

    modalWindowFocusOff() {
        this.setState({modalWindowFocus: false});
    }

    closeWindowPortal() {
        this.setState({ showWindowPortal: false })
    }

    async getPerformers() {
        const performers = [];
        const performersMas = await fetch('/api/auth/perfName')
            .then(result => result.json())
            .then(data => {
            const lenMas = data.rows.length;
            for( let i = 0; i < lenMas; i++) {
                performers[i] = {
                    label: data.rows[i].Name,
                    value: data.rows[i].ID
                }
            }
            return performers;
        }).catch(() => {
            console.log('Ошибка на /api/auth/perfName');
        });
        return performersMas;
    }

    async getFactOfAgreement() {
        const factOfAgreement = [];
        const factOfAgreementMas = await fetch('/api/auth/factOfAgreement')
            .then(result => result.json())
            .then(data => {
                const lenMas = data.rows.length;
                for(let i = 0; i < lenMas; i++) {
                    factOfAgreement[i] = {
                        label: data.rows[i].Text,
                        value: data.rows[i].Bool
                    }
                }
                return factOfAgreement;
            }).catch(() => {
                console.log('Ошибка на /api/auth/factOfAgreement');
            });
        return factOfAgreementMas;
    }

    async getProvidersList() { // функция для получения списка контрагентов
        const providersList = [];
        const providersListMas = await fetch('/api/auth/providersList')
            .then(result => result.json())
            .then(data => {
                const lenMas = data.rows.length;
                for(let i = 0; i < lenMas; i++) {
                    providersList[i] = {
                        label: data.rows[i].Name,
                        value: data.rows[i].ID
                    }
                }
                return providersList;
            }).catch(() => {
                console.log('Ошибка на /api/auth/factOfAgreement');
            });
        return providersListMas;
    }

     async fetchFromApi(apiRoute, idPKU) {                                         // функция подгрузки данных для таблиц, на вход принимает
         await fetch(`${this.url}${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
            // console.log(`/api/pkuDataServerPKUTable${idPKU}`);                  // apiRoute - api адрес, откуда нужно получить данные
             return results.json();
         }).then(
             data => {
                 // console.log(data);
                 let pkuInfoWithID = data.map((val, ix) => {
                     val.tableID = ix+1;
                     // val.DateContract = moment(val.DateContract).format('YYYY-MM-DD');
                     return val;
                 });
                 this.setState({
                     pkuInfo: pkuInfoWithID,
                     filterColor: "white",

                 });
                 this.copyPkuInfo = this.state.pkuInfo;

         }).catch(() => {
             console.log(`Ошибка при выполнении запроса с ${apiRoute}${idPKU}`);
         });
        console.log(this.state.pkuInfo)
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
        let providersListLen = this.providersList.length;
        // for(let i = 0; i < factOfAgreementLen; i++) {
        //
        //     if (this.factOfAgreement[i].label === oldValue && newValue === "") {
        //         done = false;
        //     }
        // }
        switch (this.props.typeTable) {
            case "ОМТС": {

                // for(let j = 0; j < providersListLen; j++) {
                //     let providersListJ = this.providersList[j];
                //     switch (providersListJ.label) {
                //         case rowEdit.ProviderID: {
                //             rowEdit.ProviderID = providersListJ.value;
                //             break;
                //         }
                //         default:
                //             break;
                //     }
                //
                // }

                if (rowEdit.Fact === '' || rowEdit.FactDoc === '') {
                    done = false;
                }

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
                        // rowEdit.Fact = (rowEdit.Fact ==='true');
                        // rowEdit.FactDoc = (rowEdit.FactDoc ==='true');


                        for(let j = 0; j < providersListLen; j++) {
                            let providersListJ = this.providersList[j];
                            switch (providersListJ.label) {
                                case rowEdit.ProviderName: {
                                    rowEdit.ProviderName = providersListJ.value;
                                    break;
                                }
                                default:
                                    break;
                            }

                        }


                    }
                    console.log(rowEdit);
                    this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU, rowEdit, this.props.routeNumber);

                    // this.fetchOnApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU, rowEdit, this.props.routeNumber);
                } else {
                    this.fetchFromApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU);
                }

                for(let j = 0; j < providersListLen; j++) {
                    let providersListJ = this.providersList[j];
                    switch (providersListJ.label) {
                        case rowEdit.ProviderID: {
                            rowEdit.ProviderID = providersListJ.value;
                            break;
                        }
                        default:
                            break;
                    }
                }
                break;
            }
            case "Монтажники1": {
                if (rowEdit.Fact === '') {
                    done = false;
                }

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

    handleClick(e, data) {
        console.log(e);
        console.log(data.foo);
        console.log(data);
    }

    async splitDelivery(e, data) {
        delete data.target;
        if(window.confirm("Разбить поставку?")) {
            await fetch('/api/OMTS/splitDelivery', {
                method: 'POST',
                headers:{'content-type': 'application/json'},
                mode: "cors",
                body: JSON.stringify(data),
            }).then(results => results.json()
            ).then(() => {
                this.fetchFromApi(`/api/pkuDataServerPKUTable/${this.props.routeNumber}/OMTS/`, this.props.idPKU);
            }).catch((err) => {
                console.log("!!!Err: splitDelivery");
            });
        }
    }


    render() {

        // const tableHeaders = loadPerformers(); // подключаем заголовки таблиц из файла ../data/ColumnsData
        const tableHeaders = ColumnsData(this.performers, this.factOfAgreement, this.providersList); // подключаем заголовки таблиц из файла ../data/ColumnsData
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


        // const selectRow = { // данный параметр используется для получения сведений о строке, на которую нажали (правой кнопкой мыши)
        //     mode: 'checkbox',
        //     hideSelectColumn: true, // скрываем флажки для выделения строки
        //     clickToSelect: true,
        //     onSelect: (row, neNuzhno, neNuzhno2, e) =>{
        //
        //         if (e.which === 3){
        //             alert(row)
        //         }
        //         else console.log(row)
        //
        // }
        // };


        const tableRowEvents = { // данный параметр используется для получения сведений о строке, на которую нажали (правой кнопкой мыши)
            onContextMenu: (e, row) => {
                switch (this.props.typeTable) {
                    case "ОМТС": {
                        console.log(row.DeliveryID);
                        this.setState({
                            selectedRowDeliveryId: row.DeliveryID,
                            selectedRowProvider: row.ProviderName
                        });
                        break;
                    }
                    default: {
                        this.setState({
                            selectedRowDeliveryId: null,
                            selectedRowProvider: null
                        });
                        break;
                    }
                }
            }
        };

        const indication = () => {
            return "В таблице нет информации";
        }
        // const indication = "В таблице нет информации";

        const cutData = (color) => {
            let newData = [];
            let lenMas = this.copyPkuInfo.length;


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
                    this.copyPkuInfo = this.state.pkuInfo;
                    this.setState({
                        filterColor: "yellow",
                        pkuInfo: cutData("yellow"),
                    });
                    break;
                case "yellow":

                    this.setState({
                        filterColor: "red",
                        pkuInfo: cutData("red"),
                    });
                    break;
                case "red":

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
            if (column.type === "number") {
                console.log(newValue, window)
                newValue = newValue.window.replace(/,/, '.').bind(this);
            }
            // setTimeout(() => {
            //     let factOfAgreementLen = this.factOfAgreement.length;
            //     for(let i = 0; i < factOfAgreementLen; i++) {
            //
            //         if (this.factOfAgreement[i].label === oldValue && newValue === "") {
            //             done(false);
            //         }
            //     }
            //     done(true);
            // }, 0);
            // return { async: true };
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

                                    <ContextMenuTrigger id="same_unique_identifier" holdToDisplay={-1}>
                                        {/*<div className="well">Контекстное меню открывается нажатием ПКМ</div>*/}
                                    {this.props.depName === "ОМТС" && <ContextMenu id="same_unique_identifier" className="context_menu">
                                        <MenuItem data={{deliveryId: this.state.selectedRowDeliveryId, userId: parseInt(localStorage.getItem('userId'))}} className="button7" onClick={this.splitDelivery}>
                                            Разбить поставку
                                        </MenuItem>
                                        <MenuItem data={{nameOfProvider: this.state.selectedRowProvider}} className="button7" onClick={this.modalWindowFocusOn}>
                                            Карточка контрагента
                                        </MenuItem>
                                        {/*<MenuItem data={{foo: this.state.selectedRow}} className="button7" onClick={this.handleClick}>*/}
                                        {/*    Добавить нового контрагента*/}
                                        {/*</MenuItem>*/}
                                        {/*<MenuItem divider />*/}
                                        {/*<MenuItem data={{foo: 'bar'}} onClick={selectRow}>*/}
                                        {/*    ContextMenu Item 3*/}
                                        {/*</MenuItem>*/}
                                    </ContextMenu>}
                                    <BootstrapTable
                                        // selectRow={ selectRow}
                                        wrapperClasses="table-horiz-scroll"
                                        headerClasses="thead"
                                        bodyClasses="tbody"
                                        // rowStyle={rowStyle}
                                        rowEvents={tableRowEvents} // здесь прописан обработчик события нажатия правой кнопки мыши
                                        noDataIndication={ indication }
                                        pagination={paginationFactory(optionsPagination)}
                                        cellEdit={cellEditFactory({
                                            mode: 'dbclick',
                                            // blurToSave: true,
                                            // onStartEdit: () => {console.log(document.activeElement);},

                                            beforeSaveCell,
                                            afterSaveCell: (oldValue, newValue, row, column) => {

                                                if (oldValue !== newValue) {
                                                    console.log(row);
                                                    this.uploadData(row, newValue, oldValue);
                                                }
                                            }
                                        })}
                                        // filter={filterFactory()}
                                        {...props.baseProps}
                                    />
                                    </ContextMenuTrigger>

                                </div>
                            )
                        }
                    </ToolkitProvider>

                    <div id="modalWindow">
                        {this.state.showWindowPortal && (
                            <ModalWindow
                                modalWindowFocus={this.state.modalWindowFocus}
                                closeWindowPortal={this.closeWindowPortal}
                                modalWindowFocusOff={this.modalWindowFocusOff}
                            >
                                <CardOfProviderComponent
                                    selectedRowDeliveryId={this.state.selectedRowDeliveryId}
                                    selectedProviderId={this.state.selectedProviderId}
                                    userId={localStorage.getItem('userId')}
                                    closeWindowPortal={this.closeWindowPortal}
                                >
                                </CardOfProviderComponent>
                            </ModalWindow>
                        )}
                    </div>
                </div>
                }

                <p className={"messageStyle"} align={"center"}>{this.props.hide}</p>
            </div>
        );
    }
}
export default TableComponent;