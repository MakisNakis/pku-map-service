import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import './css/TableComponent.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
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

        let selectRowProp = {
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(206,255,198)"

        };

        let tableHeaders = [];
        tableHeaders["ОМТС"] = [

        ];
        tableHeaders["Монтажники"] = [

        ];
        tableHeaders["ПТО"] = [

        ];
        tableHeaders["Отчеты"] = [{
            dataField:'WorkName',
            text:'Наименование работы',
        },{
            dataField:'HardwareName',
            text:'Название оборудования',
        },{
            dataField:'HardwareQuantity',
            text:'Количество',
        },{
            dataField:'HardwareUnit',
            text:'Единицы измерения',
        },{
            dataField:'StartDate',
            text:'Начало работ',
        },{
            dataField:'EndDate',
            text:'Конец работ',
        },{
            dataField:'HardwareComment',
            text:'Комментарий',
        }];

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
                        <BootstrapTable keyField='HardwareID'
                                        data={this.state.pkuInfo}
                                        columns={tableHeaders["Отчеты"]}
                                        // exportCSV={ true }
                                        // pagination={true}
                                        // options={options}
                                        cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
                                        // selectRow={selectRowProp}
                                        // striped
                                        // hover
                                        // condensed
                                        // insertRow
                                        // deleteRow
                                        // search
                                        // responsive
                        >

                        </BootstrapTable>
                    </div>
                }
                <p>{this.props.hide}</p>
            </div>
        );
    }
}

export default TableComponent;
