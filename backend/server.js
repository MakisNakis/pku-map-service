const express = require('express');                             // подключаем фреймворк express
const MyRepository = require('./dbRequest');                    // подключаем файл dbRequest
const app = express();
const cors = require('cors');                                   // подключаем cors для устранения ошибок в браузере при подключении к приложению с любого ip

const port = 5000;
const repository = new MyRepository();

const types = require('pg').types;                              // подключаем pg types для обработки типов данных, считываемых из pg
// const moment = require('moment');                               // подключаем moment js для обработки дат

var parseFn = function(val) {                                   // функция обработчик для обработки типов данных, считываемых из pg
    return val
    // return moment(val).format("DD.MM.YYYY")                  // модификация для преобразования считываемых данных (а именно даты) в нужный формат
}

const TYPE_DATESTAMP1 = 1082;                                   // дата без времени и без часового пояса
const  TYPE_TIMESTAMP  =  1114;                                 // дата и время без часового пояса

types.setTypeParser(TYPE_TIMESTAMP, parseFn)
types.setTypeParser(TYPE_DATESTAMP1, parseFn)
// types.setTypeParser(TYPE_DATESTAMP, date => date);

var mas = "1111";                                               // переменная для тестирования на /api/test1

app.use(cors());                                                // включение cors политики
app.use(express.json({limit: '1mb'}));                          // установка лимита (нужна для успешного получения данных из POST запроса)
app.listen(port, () => console.log(`Server started on port ${port}`));  // cвязывает и прослушивает соединения на указанном хосте и порте



app.get('/api/test', async (req, res) => {                      // тестовый api
    const pkuDataServer = [                                     //
        {id: 1, name: "Peter", lastName: "Griffin"},            //
        {id: 2, name: "Jack", lastName: "Sparrow"},             //
        {id: 3, name: "Steve", lastName: "Smith"}               //
    ];                                                          //
    res.json(pkuDataServer);                                    //
});                                                             //

// //Здесь и далее:
//     app.route('/path') - возвращает экземпляр одного маршрута, который затем можно использовать для обработки методами GET, POST и т.д.

app.route('/api/test1')                                    // тестовый api
    .post(async (req, res) => {                                 //
    mas = req.body;                                             //
    // console.log(mas);                                           //
    // console.log(req.headers.origin);                            //
    res.send(req.body);                                         //
})                                                              //
    .get( async (req, res) => {                                 //
    res.send(mas);                                              //
});                                                             //


app.get('/api/pkuDataServerFirstRoute', async (req, res) => {      // api для выгрузки точек из БД для маршрута с номером 1
    const data = await repository.loadDataForMarkers(1);    // вызов функции для выполнения запроса
    res.json(data);
});

app.get('/api/pkuDataServerSecondRoute', async (req, res) => {     // api для выгрузки точек из БД для маршрута с номером 2
    const data = await repository.loadDataForMarkers(2);    // вызов функции для выполнения запроса
    res.json(data);
});

app.get('/api/pkuDataServerThirdRoute', async (req, res) => {     // api для выгрузки точек из БД для маршрута с номером 2
    const data = await repository.loadDataForMarkers(3);    // вызов функции для выполнения запроса
    res.json(data);
});


// Здесь и далее:
//     - функция loadDataForTable используется для генерации запросов на получение данных из БД
//     - функция uploadDataForTable используется для генерации запросов на внесение данных в БД (req.body - измененная строка, полученная от клиента)
//

for (let i = 0; i < 130; i++) {                                  // цикл, в котором создаются api для разных ПКУ
    app.route(`/api/pkuDataServerPKUTable/2/OMTS/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ОМТС",2);
            console.log(data.rows);
            res.json(data.rows)
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "ОМТС", req.body.rowEdit, req.body.userId);
            console.log(data.rows);
            res.send(data);
    });

    app.route(`/api/pkuDataServerPKUTable/3/OMTS/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ОМТС", 3);
            res.json(data.rows)
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "ОМТС", req.body.rowEdit, req.body.userId);
            res.send(data);
        });

    app.route(`/api/pkuDataServerPKUTable/2/Montazhniki/Montazhniki1/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "Монтажники1");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "Монтажники1", req.body.rowEdit, req.body.userId);
            res.send(data);
            // res.json(req.body);
        });

    app.route(`/api/pkuDataServerPKUTable/3/Montazhniki/Montazhniki1/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "Монтажники1");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "Монтажники1", req.body.rowEdit, req.body.userId);
            res.send(data);
            // res.json(req.body);
        });

    app.route(`/api/pkuDataServerPKUTable/2/Montazhniki/Montazhniki2/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "Монтажники2");
            res.json(data.rows);
        })
    ;
    app.route(`/api/pkuDataServerPKUTable/3/Montazhniki/Montazhniki2/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "Монтажники2");
            res.json(data.rows);
        })
    ;

    app.route(`/api/pkuDataServerPKUTable/2/PTO/PTO1/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ПТО1");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            // console.log(req.headers.origin);
            // console.log( req.body.rowEdit);
            // console.log(req.body.userId);
            const data = await repository.uploadDataForTable(i, "ПТО1", req.body.rowEdit, req.body.userId);
            res.send(data);
    });

    app.route(`/api/pkuDataServerPKUTable/3/PTO/PTO1/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ПТО1");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            // console.log(req.headers.origin);
            // console.log( req.body.rowEdit);
            // console.log(req.body.userId);
            const data = await repository.uploadDataForTable(i, "ПТО1", req.body.rowEdit, req.body.userId);
            res.send(data);
        });

    app.route(`/api/pkuDataServerPKUTable/2/PTO/PTO2/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ПТО2");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "ПТО2", req.body.rowEdit, req.body.userId);
            // res.send(req.body);
            res.send(data);
    });

    app.route(`/api/pkuDataServerPKUTable/3/PTO/PTO2/${i}`)
        .get(async (req, res) => {
            const data = await repository.loadDataForTable(i, "ПТО2");
            res.json(data.rows);
        })
        .post(async (req, res) => {
            const data = await repository.uploadDataForTable(i, "ПТО2", req.body.rowEdit, req.body.userId);
            // res.send(req.body);
            res.send(data);
        });

    app.get(`/api/pkuDataServerPKUTable/2/Otchety/Otchety1/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Отчеты1",2);
        res.json(data.rows);
    });
    app.get(`/api/pkuDataServerPKUTable/3/Otchety/Otchety1/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Отчеты1",3);
        res.json(data.rows);
    });
    app.get(`/api/pkuDataServerPKUTable/2/Otchety/Otchety2/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Отчеты2",2);
        res.json(data.rows);
    });
    app.get(`/api/pkuDataServerPKUTable/3/Otchety/Otchety2/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Отчеты2",3);
        res.json(data.rows);
    });
    app.get(`/api/pkuDataServerPKUTable/2/Logs/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Логи",2);
        res.json(data.rows);
    });
    app.get(`/api/pkuDataServerPKUTable/3/Logs/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Логи",3);
        res.json(data.rows);
    });
}

app.route(`/api/auth`) // эндпоинт для получения id пользователя, который логинится
        .post(async (req, res) => {
            let data = req.body
            // console.log(data)
            const dbResponse = await repository.checkAuth(data);
            // res.send(req.body);
            res.send(dbResponse);
    });

app.route(`/api/changePassword`)
    .post(async (req, res) => {
        let data = req.body;
        console.log(data);
        const dbResponse = await repository.changePassword(data);
        console.log(dbResponse);
        // res.send(req.body);
        res.send(dbResponse);
    });

app.route(`/api/auth/userRole`) // эндпоинт для получения номера роли пользователя, который залогинился
    .post(async (req, res) => {
        let data = req.body;
        // console.log(data);
        const dbResponse = await repository.getUserRole(data);
        // res.send(req.body);
        res.send(dbResponse);
    });

app.route(`/api/auth/userName`) // эндпоинт для получения имени пользователя, который залогинился
    .post(async (req, res) => {
        let data = req.body
        const dbResponse = await repository.getUserName(data);
        // console.log(`В авторизовался пользователь ${dbResponse}`)
        res.send(dbResponse);
    });

app.route(`/api/auth/perfName`) // эндпоинт для получения имени исполнителя
    .get(async (req, res) => {
        const dbResponse = await repository.getPerfName();
        console.log(dbResponse.rows);
        // console.log(`В авторизовался пользователь ${dbResponse}`)
        res.send(dbResponse);
    });



app.route(`/api/auth/factOfAgreement`) // эндпоинт для получения имени исполнителя
    .get(async (req, res) => {
        const dbResponse = await repository.getFactOfAgreement();
        console.log(dbResponse.rows);
        // console.log(`В авторизовался пользователь ${dbResponse}`)
        res.send(dbResponse);
    });