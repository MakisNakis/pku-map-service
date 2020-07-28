const Client= require('pg').Client;                         // подключение модуля для соединения с БД

const DBNAME = "PKU_MapService";                            // название БД
const DBLOG = "postgres";                                   // логин в БД
const DBPASS = "postgres";                                  // пароль в БД
const DBPORT = "5432";                                      // порт БД
const connectionString = `postgressql://${DBLOG}:${DBPASS}@localhost:${DBPORT}/${DBNAME}`; // строка с данными для подключения к БД
//если вносишь изменения, то делаешь commit
//коммит логирует и сохраняет все локальные изменения

// для запуска проекта при первом его клонировании нужно сделать npm install в терминале
// он подгрузит все зависимости из файла package.json
// чтобы не подвисало, ставим индексацию на паузу, если не работаешь с проектом, то лучше дождаться пока индексация пройдет
//для запуска, в терминале пишем npm run start - так мы запустили клиентский сервер
//теперь нужно открыть второй терминал, перейти в директорию backend и прописать ту же команду
// на 5000 порту стартуют апишки, приходящие с сервера
// пример!
// оба сервера работают, бд подключена, все отлично
// теперь опять, мы внесли правки в код, хотим их зафиксировать и делаем коммит


class MyRepository {

    constructor() {
        this.client = new Client({                              // создание подключения к БД
            connectionString: connectionString
        });

    }

    async loadDataForMarkers(routeId) {                         // функция для считывания данных об объектах на маршруте
        try {
            await this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        let query = this.client.query(`select * from f_s_subject_routeid(${routeId})`); // запрос для получения координат маркеров на маршруте routeId
        // this.client.end();
        return query
    }

    async loadDataForTable(pkuId, typeTable) {                  // функция для считывания данных об объектах в зависимости от отдела
        try {
            await this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        let query = undefined;

        switch (typeTable) {
            case "ОМТС":
                query = this.client.query(`select * from f_s_equipment_routeid(2);`);           // запрос на получение информации об оборудовании для отдела комплектации

                break;
            case "Монтажники1":
                query = this.client.query(`select * from f_s_subwork_perf_subid(${pkuId});`);   // запрос на получение информации о работах на объекте для отдела монтажников

                break;
            case "Монтажники2":
                query = this.client.query(`select * from f_s_subhw_subid(${pkuId});`);          // запрос на получение информации об оборудовании для монтажников

                break;
            case "ПТО1":
                query = this.client.query(`select * from f_s_subwork_pto_subid(${pkuId});`);    // запрос на получение информации о работах на объекте для отдела ПТО
                break;
            case "ПТО2":
                query = this.client.query(`select * from f_s_subhw_subid(${pkuId});`);          // запрос на получение информации об оборудовании для отдела ПТО

                break;
            case "Отчеты1":
                query = this.client.query(`select * from f_s_report_general_routeid(2);`);      // запрос на получение отчетов

                break;
            case "Отчеты2":
                query = this.client.query(`select * from f_s_report_general_routeid(2);`);      // запрос на получение отчетов

                break;
            default:
                break;
        }
        // this.client.end();
        return query
    }

    convertToPG (data) {                        // функция для окружения строки символами '' (требуется для передачи данных в postgres)
        return '\''+data+'\'';
    }

    async uploadDataForTable(pkuId, typeTable, row) {

        let query = undefined;
        let user = 1;                           // 1 - Админ - (временная переменная из за отсутствия регистрации)


        // Здесь и далее для всех отделов:
        //  - if используется для преобразования даты и комментария в тип, пригодный для pg (т.е. данные должны быть окружены '')

        switch (typeTable) {
            case "ОМТС":
                let DateContract = null;
                let DatePlan = null;
                let DateFact = null;
                let CommentOMTS = '';

                if(row.DateContract !== null) {
                    DateContract = this.convertToPG(row.DateContract);
                }
                if(row.DatePlan !== null) {
                    DatePlan = this.convertToPG(row.DatePlan);
                }

                if(row.DateFact !== null) {
                    DateFact = this.convertToPG(row.DateFact);
                }
                if(row.Comment !== null) {
                    CommentOMTS = row.Comment;
                }

                                                                 // запрос на внесение данных для отдела комплектации
                query = this.client.query(`select * from f_u_equipment(        
                    ${row.DeliveryID}, 
                    ${DateContract}, 
                    ${DatePlan}, 
                    ${DateFact}, 
                    ${row.Quantity}, 
                    ${this.convertToPG(CommentOMTS)},
                    ${user}
                );`);
                break;
            case "Монтажники1":
                let DateWork = null;
                let CommentMontazhniki1 = '';
                if(row.DateWork !== null) {
                    DateWork = this.convertToPG(row.DateWork);
                }
                if(row.Comment !== null) {
                    CommentMontazhniki1 = row.Comment;
                }

                                                                // запрос на внесение данных о работах для монтажников
                query = this.client.query(`select * from f_u_subwork_perf(
                    ${row.WorkID},
                    ${DateWork},
                    ${this.convertToPG(row.Fact)},
                    ${user},
                    ${this.convertToPG(CommentMontazhniki1)},
                    ${user}
                );`);
                break;
            case "ПТО1":
                let StartDateCon = null;
                let EndDateCon = null;
                let StartDatePlan = null;
                let EndDatePlan = null;
                let DateWorkPTO = null;
                let EndDateAkt = null;
                let MaterialDate = null;
                let CommentPTO1 = '';

                if(row.StartDateCon !== null) {
                    StartDateCon = this.convertToPG(row.StartDateCon);
                }
                if(row.EndDateCon !== null) {
                    EndDateCon = this.convertToPG(row.EndDateCon);
                }
                if(row.StartDatePlan !== null) {
                    StartDatePlan = this.convertToPG(row.StartDatePlan);
                }
                if(row.EndDatePlan !== null) {
                    EndDatePlan = this.convertToPG(row.EndDatePlan);
                }
                if(row.DateWork !== null) {
                    DateWorkPTO = this.convertToPG(row.DateWork);
                }
                if(row.EndDateAkt !== null) {
                    EndDateAkt = this.convertToPG(row.EndDateAkt);
                }
                if(row.MaterialDate !== null) {
                    MaterialDate = this.convertToPG(row.MaterialDate);
                }
                if(row.Comment !== null) {
                    CommentPTO1 = row.Comment;
                }

                                                                // запрос на внесение данных о работах для отдела ПТО
                query = this.client.query(`select * from f_u_subwork_pto(
                    ${row.WorkID},
                    ${row.Quantity},
                    ${StartDateCon},
                    ${EndDateCon},
                    ${StartDatePlan},
                    ${EndDatePlan},
                    ${DateWorkPTO},
                    ${this.convertToPG(row.Fact)},
                    ${user},
                    ${EndDateAkt},
                    ${MaterialDate},
                    ${this.convertToPG(CommentPTO1)},
                    ${user}
                );`);
                break;
            case "ПТО2":

                                                                // запрос на внесение данных об оборудовании для отдела ПТО
                query = this.client.query(`select * from f_u_worknomgr(
                    ${row.WorksNomGroupID},
                    ${row.QuantityNG},
                    ${user}
                );`);
                break;
            default:
                break;
        }
        // this.client.end();
        return query
    }

    async checkAuth(data) { // функция для проверки пароля и логина пользователя
        try {
            await this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }
        let query = undefined;
        const logForPG = this.convertToPG(data.login);
        const passForPG = this.convertToPG(data.password);
        console.log(data.password)
        query = this.client.query(`select * from f_s_userid_logpas(${logForPG}, ${passForPG});`);        // this.client.end();
        return query
    }

    async getUserRole(data) { // функция для проверки пароля и логина пользователя
        try{
            await this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }
        const userIdPG = this.convertToPG(data.userId);
        console.log(userIdPG)
        let query = this.client.query(`select * from f_s_roleid_userid(${userIdPG});`);        // this.client.end();
        return query
    }

    async getUserName(data) { // функция для проверки пароля и логина пользователя
        try{
            await this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }
        const userIdPG = this.convertToPG(data.userId);
        console.log(userIdPG)
        let query = this.client.query(`select * from f_s_username_userid(${userIdPG});`)
        return query
    }
}

module.exports = MyRepository;
