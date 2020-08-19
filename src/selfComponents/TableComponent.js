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


class TableComponent extends Component {

    constructor() {
        super();
        this.state = {
            pkuInfo: [],
            filterColor: "white",
            // showModalWindow: false,
        };
        this.url = window.location.href;
        this.copyPkuInfo = [];
        // this.confirm = false;
    }



    async fetchFromApi(apiRoute, idPKU) {                                         // функция подгрузки данных для таблиц, на вход принимает
        await fetch(`${this.url}${apiRoute}${idPKU}`).then(results => {     // idPKU - получаемый по нажатии на маркер в MapComponent и
           // console.log(`/api/pkuDataServerPKUTable${idPKU}`);                  // apiRoute - api адрес, откуда нужно получить данные
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
                    filterColor: "white",

                });
                this.copyPkuInfo = this.state.pkuInfo;

            // console.log(this.state.pkuInfo);
            // console.log(Object.keys(data.rows[0])[0]);
        }).catch(() => {
            console.log(`Ошибка при выполнении запроса с ${apiRoute}${idPKU}`);
        });

    }


    async loadData(idPKU, typeTable) { // функция для выгрузки соотвествующих для отдела depName данных
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

    async uploadData(rowEdit) {
        // let userId = localStorage.getItem('userId')
        // console.log(userId)
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
        }
    }

    async fetchOnApi(apiRoute, idPKU, rowEdit) {
        let jsonObj = {rowEdit: rowEdit, userId: localStorage.getItem('userId')}
        console.log(window.location.href);
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
            console.log(results);
            return results.json();
        }).then(data => {
            console.log(data);
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
            // bgColor: "rgb(206,255,198)"
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

            console.log(color);

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
                    console.log('###### ' + this.state.filterColor);
                    this.copyPkuInfo = this.state.pkuInfo;
                    this.setState({
                        filterColor: "yellow",
                        pkuInfo: cutData("yellow"),
                    });
                    break;
                case "yellow":
                    console.log('###### ' + this.state.filterColor);

                    this.setState({
                        filterColor: "red",
                        pkuInfo: cutData("red"),
                    });
                    break;
                case "red":
                    console.log('###### ' + this.state.filterColor);

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


        // const handleClose = async () => {
        //     console.log("%%%%%%%%%%%");
        //     this.setState({showModalWindow: false});
        //     console.log(this.state.showModalWindow);
        // };
        //
        // const handleSave = async () => {
        //     console.log("$$$$$$$$$$");
        //     this.confirm = true;
        //     console.log(this.confirm);
        //     await handleClose();
        // };
        //
        // const handleShow = async () => {
        //     console.log("!@@!@@!@@!@");
        //     this.setState({showModalWindow: true});
        //     console.log(this.state.showModalWindow);
        // };

        // const beforeSaveCell = (oldValue, newValue, row, column, done) => {
        //     // console.log(this.confirm);
        //     this.setState({showModalWindow: true});
        //     // this.confirm = window.confirm('Do you want to accept this change?');
        //
        //     // if (window.confirm('Do you want to accept this change?')) {
        //     //     done(true);
        //     // } else {
        //     //     done(false);
        //     // }
        //     return { async: true };
        // }


        return (
            <div id="TableComp" >
                {this.props.show &&
                <div>
                    <ToolkitProvider
                        keyField={"tableID"}
                        data={this.state.pkuInfo}
                        columns={tableHeaders[this.props.typeTable]}
                        exportCSV={{
                            fileName: 'таблица.csv'
                        }}
                    >
                        {
                            props => (
                                <div>
                                    <MyExportCSV { ...props.csvProps } />
                                    {/*<ExportCSVButton className={"button8"} {...props.csvProps}>Экспортировать в CSV</ExportCSVButton>*/}
                                    {this.props.depName === "Отчеты" && <button className="button9" style={{backgroundColor: this.state.filterColor}} onClick={filterColor}>Фильтр</button>}
                                    <br/>
                                    {/*<div>*/}
                                    {/*    <Modal*/}
                                    {/*        show={this.state.showModalWindow}*/}
                                    {/*        onHide={handleClose}*/}
                                    {/*        backdrop="static"*/}
                                    {/*    >*/}
                                    {/*        <Modal.Header closeButton>*/}
                                    {/*            <Modal.Title>Modal heading</Modal.Title>*/}
                                    {/*        </Modal.Header>*/}
                                    {/*        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>*/}
                                    {/*        <Modal.Footer>*/}
                                    {/*            <Button variant="secondary" onClick={handleClose}>*/}
                                    {/*                Close*/}
                                    {/*            </Button>*/}
                                    {/*            <Button variant="primary" onClick={handleSave}>*/}
                                    {/*                Save Changes*/}
                                    {/*            </Button>*/}
                                    {/*        </Modal.Footer>*/}
                                    {/*    </Modal>*/}
                                    {/*</div>*/}
                                    <BootstrapTable
                                        wrapperClasses="table-horiz-scroll"
                                        headerClasses="thead"
                                        bodyClasses="tbody"
                                        // rowStyle={rowStyle}
                                        noDataIndication={ indication }
                                        pagination={paginationFactory(optionsPagination)}
                                        cellEdit={cellEditFactory({
                                            mode: 'dbclick',
                                            blurToSave: false,
                                            // beforeSaveCell,
                                            afterSaveCell: (oldValue, newValue, row, column) => {
                                                console.log(this.confirm);
                                                if (oldValue !== newValue ) {
                                                    // this.confirm = false;
                                                    // console.log("***********888" + this.confirm);
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