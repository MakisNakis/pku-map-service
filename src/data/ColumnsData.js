import { Type } from 'react-bootstrap-table2-editor';

function CellStyle(cell, row, rowIndex, colIndex) {
    let backgroundColor = '#ffffff';

    let nameColumnColor = Object.keys(row)[colIndex+1];

    if (row.nameColumnColor !== null ) {
        return {
            backgroundColor: `${row.EndDatePlanColor}`
        };
    }
    return {
        backgroundColor: '#ffffff'
    };
}

// export async function loadPerformers(){
//     await fetch(`/api/auth/perfName`).then(results => {
//         return results.json();
//     }).then(
//         data => {
//             // console.log(data.rows[0])
//             return data.rows
//             // this.setState({performers: data.rows})
//             // localStorage.setItem('performers', data.rows);
//             // console.log(this.state.performers[0].Name)
//         }).catch(() => {
//         console.log(`Ошибка при выполнении запроса с /api/auth/perfName`);
//     });
// }

export function ColumnsData(performers, factOfAgreement) {

        // const performers = localStorage.getItem('performers')
    // let performers = [{label: "1"}, {label:"2"}, {label: "3"}]

// console.log()
    console.log(performers);
    console.log(factOfAgreement);
// console.log(JSON.stringify(performers))


//     let performersMas = []
//     let performersMas = [{label: "Бажутов Сергей", value: 1}, {label: "Камалетдинов Рамис", value: 2}, {label: "Шакиров Ришат", value: 3}]
    // let performersMas = [{label: "Бажутов Сергей", value: "Бажутов Сергей"}, {label: "Камалетдинов Рамис", value: "Камалетдинов Рамис"}, {label: "Шакиров Рашид", value: "Шакиров Рашид"}]
//     for (let i = 0; i < performers.length; i++){
//         performersMas[i] = {label: performers[i].Surname}
//     }
// console.log(performersMas)

    let tableHeaders = [];
    //ОМТС
    tableHeaders["ОМТС"] = [{
        dataField: 'NomGroupName',
        text: 'Название оборудования',
        sort: true,
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
        sort: true,
        editor: {
            type: Type.TEXTAREA
        },
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 600, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Согласование',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: factOfAgreement
        },
        editable: true,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'ProviderName',
        text: 'Контрагент',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'DateContract',
        text: 'Дата договора с контрагентом',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Единицы измерения',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Quantity',
        text: 'Количество',
        sort: true,
        type: 'number',
        headerStyle: (colum, colIndex) => {
            return {width: 120, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityAll',
        text: 'Требуемое кол-во',
        sort: true,
        type: 'number',
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'FactDoc',
        text: 'Закрытие документации',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: factOfAgreement
        },
        editable: true,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDate',
        text: 'Начало работ',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    },  {
        dataField: 'Comment',
        text: 'Комментарий',
        sort: true,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    },{
        dataField: 'DateUp',
        text: 'Дата внесения изменений',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
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
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 650, textAlign: 'center'};
        }

    }, {
        dataField: 'Quantity',
        text: 'Кол-во',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Ед. изм.',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: factOfAgreement
    },
        editable: true,
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'PerformerName',
        text: 'Исполнитель',
        sort: true,
        editable: true,
        editor: {
            type: Type.SELECT,
            options: performers
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        sort: true,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // ПТО
    tableHeaders["ПТО1"] = [{
        dataField: 'WorkName',
        text: 'Наименование работы',
        sort: true,
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        }
    }, {
        dataField: 'Quantity',
        text: 'Кол-во',
        sort: true,
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'Unit',
        text: 'Ед. изм.',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 100, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDateCon',
        text: 'Дата нач. (контр.)',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата кон. (контр.)',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        // editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        sort: true,
        editor: {
            type: Type.SELECT,
            options: factOfAgreement
        },
        editable: true,
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'PerformerName',
        text: 'Исполнитель',
        sort: true,
        editable: true,
        editor: {
            type: Type.SELECT,
            options: performers
        },
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Месяц закр. по актам',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов',
        sort: true,
        editor: {
            type: Type.DATE,
            defaultValue: Date.now()
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        sort: true,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изменений',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // Отчеты
    tableHeaders["Отчеты1"] = [{
        dataField: 'SubjectName',
        text: 'Название участка',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 350, textAlign: 'center'};
        },
        headerClasses: 'fixed-header',
    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки (ОМТС)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки (ОМТС)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DateFactColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }

    }, {
        dataField: 'StartDateCon',
        text: 'Дата начала по контракту',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата конца по контракту',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата начала плановая (ПТО)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.StartDatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата конца плановая (ПТО)',
        sort: true,
        editable: false,
        // style: CellStyle,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.EndDatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата выполнения работ (Участок)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DateWorkColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения работ (Участок)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.FactColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Дата закрытия по актам (ПТО)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.EndDateAktColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов (ПТО)',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];


    // Перечень оборудования ПТО
    tableHeaders["ПТО2"] = [{
        dataField: 'HardwareModel',
        text: 'Модель оборудования',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 400, textAlign: 'center'};
        }

    }, {
        dataField: 'NomGroupName',
        text: 'Наименование',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 800, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityNG',
        text: 'Количество',
        sort: true,
        // editable: false,
        type: 'number',
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'WorkName',
        text: 'Наименование работы',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 700, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }];




    // Перечень оборудования монтажники
    tableHeaders["Монтажники2"] = [{
        dataField: 'HardwareModel',
        text: 'Модель оборудования',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 400, textAlign: 'center'};
        }

    }, {
        dataField: 'NomGroupName',
        text: 'Наименование',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 800, textAlign: 'center'};
        }
    }, {
        dataField: 'QuantityNG',
        text: 'Кол-во наименований',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 150, textAlign: 'center'};
        }
    }, {
        dataField: 'WorkName',
        text: 'Наименование работы',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 700, textAlign: 'center'};
        }
    }, {
        dataField: 'Comment',
        text: 'Комментарий',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'UserName',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изм.',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }];


    // Отчеты 2
    tableHeaders["Отчеты2"] = [{
        dataField: 'SubjectName',
        text: 'Название участка',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 750, textAlign: 'center'};
        },
        headerClasses: 'fixed-header',
    }, {
        dataField: 'DatePlan',
        text: 'Плановая дата поставки',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateFact',
        text: 'Фактическая дата поставки',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DateFactColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }

    }, {
        dataField: 'StartDateCon',
        text: 'Дата нач. (контр.)',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateCon',
        text: 'Дата кон. (контр.)',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 300, textAlign: 'center'};
        }
    }, {
        dataField: 'StartDatePlan',
        text: 'Дата нач. (план.)',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.StartDatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDatePlan',
        text: 'Дата кон. (план.)',
        sort: true,
        editable: false,
        // style: CellStyle,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.EndDatePlanColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'DateWork',
        text: 'Дата пров. работ',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.DateWorkColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'Fact',
        text: 'Факт выполнения',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.FactColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'EndDateAkt',
        text: 'Месяц закр. по актам',
        sort: true,
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
            let backgroundColor = '#ffffff';
            let color = row.EndDateAktColor;
            if (color !== null) {
                backgroundColor =  color;
            }
            return {
                backgroundColor: backgroundColor
            };
        },
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'MaterialDate',
        text: 'Дата списания материалов',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }];

    tableHeaders["Логи"] = [{
        dataField: 'Comment',
        text: 'Описание',
        sort: true,
        headerStyle: (colum, colIndex) => {
            return {width: 700, textAlign: 'center'};
        }
    }, {
        dataField: 'TableName',
        text: 'Название таблицы',
        sort: true,
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 180, textAlign: 'center'};
        }
    }, {
        dataField: 'RowName',
        text: 'Название колонки',
        sort: true,
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 180, textAlign: 'center'};
        }
    }, {
        dataField: 'OldValue',
        text: 'Старое значение',
        sort: true,
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'NewValue',
        text: 'Новое значение',
        sort: true,
        editable: false,

        headerStyle: (colum, colIndex) => {
            return {width: 200, textAlign: 'center'};
        }
    }, {
        dataField: 'User',
        text: 'Пользователь',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 180, textAlign: 'center'};
        }
    }, {
        dataField: 'DateUp',
        text: 'Дата внес. изменений',
        sort: true,
        editable: false,
        headerStyle: (colum, colIndex) => {
            return {width: 180, textAlign: 'center'};
        }
    }];

    return tableHeaders;

}
