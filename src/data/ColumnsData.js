import { Type } from 'react-bootstrap-table2-editor';

export function ColumnsData() {

    let tableHeaders = [];
    //ОМТС
    tableHeaders["ОМТС"] = [{
        dataField: 'NomGroupName',
        text: 'Название оборудования',
        editor: {
            type: Type.TEXTAREA
        },
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 600, textAlign: 'center'};
        }
    }, {
        dataField: 'HardwareModel',
        text: 'Расшифровка (согласованная)',
        editor: {
            type: Type.TEXTAREA
        },
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 600, textAlign: 'center'};
        }
    }, {
        dataField: 'Date',
        text: 'Дата согласования',
        editor: {
            type: Type.DATE
        },
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'ProviderName',
        text: 'Контрагент',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'DateContract',
        text: 'Дата договора с контрагентом',
        editor: {
            type: Type.DATE
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Единицы измерения',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Quantity',
        text: 'Количество',
        type: 'number',
        headerStyle: (colum, colIndex) => {
            return {width: 120, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityAll',
        text: 'Требуемое кол-во',
        type: 'number',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    },  {
        dataField: 'Comment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    },{
        dataField: 'DateUp',
        text: 'Дата внесения изменений',
        editor: {
            type: Type.DATE
        },
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }
    ];


    // Монтажники
    tableHeaders["Монтажники1"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        }

    }, {
        dataField: 'Quantity',
        text: 'Кол-во',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Ед. изм.',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        editor: {
            type: Type.CHECKBOX,
            value: 'false:true'
        },
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'PerformerName',
        text: 'Исполнитель',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // ПТО
    tableHeaders["ПТО1"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        }
    }, {
        dataField: 'Quantity',
        text: 'Кол-во',
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Ед. изм.',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDateCon',
        text: 'Дата нач. (контр.)',
        editor: {
            type: Type.DATE
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата кон. (контр.)',
        editor: {
            type: Type.DATE
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        editor: {
            type: Type.DATE
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        editor: {
            type: Type.DATE
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        editor: {
            type: Type.CHECKBOX,
            value: 'false:true'
        },
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'PerformerName',
        text: 'Исполнитель',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Месяц закр. по актам',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов',
        editor: {
            type: Type.DATE
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изменений',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // Отчеты
    tableHeaders["Отчеты1"] = [{
        dataField: 'SubjectName',
        text: 'Название участка',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        },
        headerClasses: 'fixed-header',
    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }

    }, {
        dataField: 'StartDateCon',
        text: 'Дата нач. (контр.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата кон. (контр.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Месяц закр. по актам',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // Перечень оборудования ПТО
    tableHeaders["ПТО2"] = [{
        dataField: 'HardwareModel',
        text: 'Модель оборудования',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 400, textAlign: 'center'};
        }

    }, {
        dataField: 'NomGroupName',
        text: 'Наименование',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 800, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityNG',
        text: 'Количество',
        // editable: false,
        type: 'number',
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'WorkName',
        text: 'Наименование работы',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 700, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }];




    // Перечень оборудования монтажники
    tableHeaders["Монтажники2"] = [{
        dataField: 'HardwareModel',
        text: 'Модель оборудования',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 400, textAlign: 'center'};
        }

    }, {
        dataField: 'NomGroupName',
        text: 'Наименование',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 800, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityNG',
        text: 'Кол-во наименований',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'WorkName',
        text: 'Наименование работы',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 700, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }];


    // Отчеты 2
    tableHeaders["Отчеты2"] = [{
        dataField: 'SubjectName',
        text: 'Название участка',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        }

    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }

    }, {
        dataField: 'StartDateCon',
        text: 'Дата нач. (контр.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата кон. (контр.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Месяц закр. по актам',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];
    return tableHeaders;

}
