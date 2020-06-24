
export function ColumnsData() {

    let tableHeaders = [];
    tableHeaders["ОМТС"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        headerStyle: (colum, colIndex) => {
            return {width: '30%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareName',
        text: 'Название оборудования',
        headerStyle: (colum, colIndex) => {
            return {width: '30%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Расшифровка наименования',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Расшифровка (согласованная)',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата согласования',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата размещения в производство',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата поставки',
        headerStyle: (colum, colIndex) => {
            return {width: '15%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareQuantity',
        text: 'Количество',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareUnit',
        text: 'Единицы измерения',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        headerStyle: (colum, colIndex) => {
            return {width: '15%', textAlign: 'center'};
        }
    }, {
        dataField: 'EndDate',
        text: 'Конец работ',
        headerStyle: (colum, colIndex) => {
            return {width: '15%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareComment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }];

    tableHeaders["Монтажники"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }

    }, {
        dataField: 'HardwareName',
        text: 'Название оборудования',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Расшифровка (согласованная)',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата поставки',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareQuantity',
        text: 'Количество',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareUnit',
        text: 'Единицы измерения',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: 'EndDate',
        text: 'Конец работ',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Исполнитель',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата выполнения',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareComment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {textAlign: 'center'};
        }
    }];


    tableHeaders["ПТО"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        headerStyle: (colum, colIndex) => {
            return {width: '40%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareName',
        text: 'Название оборудования',
        headerStyle: (colum, colIndex) => {
            return {width: '40%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Расшифровка (согласованная)',
        headerStyle: (colum, colIndex) => {
            return {width: '30%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата поставки',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareQuantity',
        text: 'Кол-во',
        headerStyle: (colum, colIndex) => {
            return {width: '15%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareUnit',
        text: 'Ед.изм.',
        headerStyle: (colum, colIndex) => {
            return {width: '15%', textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: 'EndDate',
        text: 'Конец работ',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Исполнитель',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата выполнения',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Закрытие по актам',
        headerStyle: (colum, colIndex) => {
            return {width: '20%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Подтвержд. монтажа',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Списание материалов',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareComment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {width: '25%', textAlign: 'center'};
        }
    }];

    tableHeaders["Отчеты"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        headerStyle: (colum, colIndex) => {
            return {width: 950, textAlign: 'center'};
        }

    }, {
        dataField: 'HardwareName',
        text: 'Название оборудования',
        headerStyle: (colum, colIndex) => {
            return {width: 800, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Расшифровка (согласованная)',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }

    }, {
        dataField: '',
        text: 'Дата размещения в производство',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата поставки',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDate',
        text: 'Конец работ',
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Исполнитель монтажа',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Дата выполнения',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Комментарий исполнителя монтажа',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: '',
        text: 'Факт закрытия по актам',
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];

    return tableHeaders;

}
