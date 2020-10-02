const Client= require('pg').Client;                         // подключение модуля для соединения с БД

const DBNAME = "PKU_MapService";
const DBLOG = "postgres";
const DBPASS = "postgres";
const DBPORT = "5432";
const connectionString = `postgressql://${DBLOG}:${DBPASS}@localhost:${DBPORT}/${DBNAME}`;
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
        try {
            this.client.connect();                        // создание подключения
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

    }


    async loadDataForMarkers(routeId) {                         // функция для считывания данных об объектах на маршруте

        let query = this.client.query(`select *,${routeId} as routenumber  from f_s_subject_routeid(${routeId})`); // запрос для получения координат маркеров на маршруте routeId
        // this.client.end();
        return query
    }

    async loadDataForTable(pkuId, typeTable, routeNumber) {                  // функция для считывания данных об объектах в зависимости от отдела
        let query = undefined;
        // console.log(typeof(routeNumber))
        // console.log(routeNumber)
        switch (typeTable) {
            case "ОМТС":
                query = this.client.query(`select * from f_s_equipment_routeid(${routeNumber});`);           // запрос на получение информации об оборудовании для отдела комплектации
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
                query = this.client.query(`select * from f_s_report_general_routeid(${routeNumber});`);      // запрос на получение отчетов
                break;

            case "Отчеты2":
                query = this.client.query(`select * from f_s_report_general_routeid(${routeNumber});`);      // запрос на получение отчетов
                break;

            case "Логи":
                query = this.client.query(`select * from f_s_logs_routeid(${routeNumber});`);      // запрос на получение отчетов
                // query = {rows: 'hello'}
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

    async uploadDataForTable(pkuId, typeTable, row, userIdString) {

        let query = undefined
        let userId = parseInt(userIdString)
        // let performerId = 1
        // let userId = 3
        let date = new Date().toLocaleDateString()
        let time = new Date().toLocaleTimeString()
        console.log(`Изменения в таблицу внес пользователь с id №${userIdString} в ${time} ${date} `)
        // console.log(userId)
                                  // 1 - Админ - (временная переменная из за отсутствия регистрации)
                                // 1 - Админ - (временная переменная из за отсутствия регистрации)
        // Здесь и далее для всех отделов:
        //  - if используется для преобразования даты и комментария в тип, пригодный для pg (т.е. данные должны быть окружены '')
        // console.log("!!!!!!!    " + localStorage.getItem('userName'));
        console.log(row);
        switch (typeTable) {
            case "ОМТС":
                let DateContract = null;
                let DatePlan = null;
                let DateFact = null;
                let CommentOMTS = null;
                let Fact = null;
                let FactDoc = null;

                if(row.DateContract !== null && row.DateContract !== '') {
                    DateContract = this.convertToPG(row.DateContract);
                }
                if(row.DatePlan !== null && row.DatePlan !== '') {
                    DatePlan = this.convertToPG(row.DatePlan);
                }

                if(row.DateFact !== null && row.DateFact !== '') {
                    DateFact = this.convertToPG(row.DateFact);
                }
                if(row.Comment !== '' && row.Comment !== null) {
                    CommentOMTS = this.convertToPG(row.Comment);
                }
                if(row.ProviderName === '' || row.ProviderName === null) {
                    row.ProviderName = 'null'
                }


                if(row.Fact === 'Выполнено') {
                    Fact = 'true'
                } else if(row.Fact === 'Не выполнено') {
                    Fact = 'false'
                } else if(row.Fact === null) {
                    Fact = 'null'}
                else Fact = this.convertToPG(row.Fact);

                if (row.FactDoc === 'Выполнено') {
                    FactDoc = 'true'
                } else if(row.FactDoc === 'Не выполнено') {
                    FactDoc = 'false'
                } else if(row.FactDoc === null) {
                    Fact = 'null'}
                else FactDoc = this.convertToPG(row.FactDoc);
                                                                 // запрос на внесение данных для отдела комплектации
                query = this.client.query(`select * from f_u_equipment(        
                    ${row.DeliveryID}, 
                    ${DateContract}, 
                    ${DatePlan}, 
                    ${DateFact}, 
                    ${row.Quantity}, 
                    ${CommentOMTS},
                    ${userId},
                    ${row.ProviderName},
                    ${Fact},
                    ${FactDoc}
                );`);
                break;
            case "Монтажники1":
                let DateWork = null;
                let PerformerNameMontazhniki = null;
                // let flag1 = null;
                let CommentMontazhniki1 = null;

                if(row.DateWork !== null && row.DateWork !== '') {
                    DateWork = this.convertToPG(row.DateWork);
                }
                if(row.Comment !== '' && row.Comment !== null) {
                    CommentMontazhniki1 = this.convertToPG(row.Comment);
                }

                if (row.PerformerName !== '') {
                    PerformerNameMontazhniki = parseInt(row.PerformerName);
                }

                // if(row.PerformerName === 'Бажутов Сергей' || row.PerformerName === 'Бажутов С.') {
                //     PerformerNameMontazhniki = 1;
                // } else if(row.PerformerName === 'Камалетдинов Рамис' || row.PerformerName === 'Камалетдинов Р.') {
                //     PerformerNameMontazhniki = 2;
                // } else if(row.PerformerName === 'Шакиров Ришат' || row.PerformerName === 'Шакиров Р.') {
                //     PerformerNameMontazhniki = 3;
                // } else if(row.PerformerName === '---' ) {
                //     PerformerNameMontazhniki = null;
                // } else {
                //     PerformerNameMontazhniki = parseInt(row.PerformerName);
                // }
                                                                // запрос на внесение данных о работах для монтажников
                query = this.client.query(`select * from f_u_subwork_perf(
                    ${row.WorkID},
                    ${DateWork},
                    ${this.convertToPG(row.Fact)},
                    ${PerformerNameMontazhniki},
                    ${CommentMontazhniki1},
                    ${userId}
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
                let CommentPTO1 = null;
                let PerformerNamePTO = null;

                if(row.StartDateCon !== null && row.StartDateCon !== '') {
                    StartDateCon = this.convertToPG(row.StartDateCon);
                }
                if(row.EndDateCon !== null && row.EndDateCon !== '') {
                    EndDateCon = this.convertToPG(row.EndDateCon);
                }
                if(row.StartDatePlan !== null && row.StartDatePlan !== '') {
                    StartDatePlan = this.convertToPG(row.StartDatePlan);
                }
                if(row.EndDatePlan !== null && row.EndDatePlan !== '') {
                    EndDatePlan = this.convertToPG(row.EndDatePlan);
                }
                if(row.DateWork !== null && row.DateWork !== '') {
                    DateWorkPTO = this.convertToPG(row.DateWork);
                }
                if(row.EndDateAkt !== null && row.EndDateAkt !== '') {
                    EndDateAkt = this.convertToPG(row.EndDateAkt);
                }
                if(row.MaterialDate !== null && row.MaterialDate !== '') {
                    MaterialDate = this.convertToPG(row.MaterialDate);
                }
                if(row.Comment !== '' && row.Comment !== null) {
                    CommentPTO1 = this.convertToPG(row.Comment);
                }
                if (row.PerformerName !== '') {
                    PerformerNamePTO = parseInt(row.PerformerName);
                }
                // if(row.PerformerName === 'Бажутов Сергей' || row.PerformerName === 'Бажутов С.') {
                //     PerformerNamePTO = 1;
                // } else if(row.PerformerName === 'Камалетдинов Рамис' || row.PerformerName === 'Камалетдинов Р.') {
                //     PerformerNamePTO = 2;
                // } else if(row.PerformerName === 'Шакиров Ришат' || row.PerformerName === 'Шакиров Р.') {
                //     PerformerNamePTO = 3;
                // } else if(row.PerformerName === '---' ) {
                //     PerformerNamePTO = null;
                // } else {
                //     PerformerNamePTO = parseInt(row.PerformerName);
                // }
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
                    ${PerformerNamePTO},
                    ${EndDateAkt},
                    ${MaterialDate},
                    ${CommentPTO1},
                    ${userId}
                );`);
                break;
            case "ПТО2":
                                                                // запрос на внесение данных об оборудовании для отдела ПТО
                query = this.client.query(`select * from f_u_worknomgr(
                    ${row.WorksNomGroupID},
                    ${row.QuantityNG},
                    ${userId}
                );`);
                break;
            default:
                break;
        }
        // this.client.end();
        return query
    }

     async checkAuth(data) { // функция для проверки пароля и логина пользователя
        let query = undefined;
        const logForPG = this.convertToPG(data.login);
        const passForPG = this.convertToPG(data.password);
        // console.log(data.password)
        query = this.client.query(`select * from f_s_userid_logpas(${logForPG}, ${passForPG});`);        // this.client.end();
        return query
    }

     async getUserRole(data) { // функция для получения роли пользователя
        const userIdPG = this.convertToPG(data.userId);
        // console.log(userIdPG)
        let query = this.client.query(`select * from f_s_roleid_userid(${userIdPG});`);        // this.client.end();
        return query
    }

     async getUserName(data) { // функция для получения имени пользователя
        const userIdPG = this.convertToPG(data.userId);
         let query = this.client.query(`select * from f_s_username_userid(${userIdPG});`)
         let date = new Date().toLocaleDateString()
         let time = new Date().toLocaleTimeString()
             // .then(result => {
             //    console.log(`Авторизовался пользователь ${result.rows[0].f_s_username_userid}`)
             // })
         console.log(`Авторизовался пользователь с id №${data.userId} в ${time} ${date} `)
         return query;
     }

    async getPerfName() { // функция для получения имени исполнителя (монтажника)
        let query = this.client.query(`select * from f_s_performers_list();`);
        return query;
    }

    async getFactOfAgreement() {
        let query = this.client.query(`select * from f_s_bool_list();`);
        return query;
    }

    async getProvidersList() {
        let query = this.client.query(`select * from f_s_providers_list();`);
        return query;
    }

    async changePassword(data) {
        // let query = false;
        let query = this.client.query(`select * from f_s_userid_changepas(
            ${data.userId},
            ${this.convertToPG(data.password)}
        );`);
        return query;
    }

    async splitDelivery(data) {
        let query = this.client.query(`select * from f_i_copy_deliveris(
            ${data.deliveryId},
            ${data.userId}
        );`);
        return query;
    }

    async getCardOfProvider(data) {
        let query = this.client.query(`select * from f_s_provider(
            ${data.ProviderId}
        );`);
        return query;
    }

    async updateCardOfProvider(data) {
        // this.toStringForDb(data.Name)
        let query = this.client.query(`select * from f_u_provider_deliveryid(
            ${data.ID},
            ${this.convertToPG(data.Name)},
            ${this.convertToPG(data.Contact)},
            ${this.convertToPG(data.INN)},
            ${data.UserId}
        );`);
        return query;
    }

    async selectProvidersDocuments(data) {
        let query = this.client.query(`select * from f_s_docs_providerid(
            ${data.ProvidersId}
        );`);
        return query;
    }

    async updateProvidersDocuments(rowEdit, userId, routeNumber, providerId) {
        let query = this.client.query(`select * from f_u_docs(
            ${this.convertToPG(rowEdit.ID)},
            ${this.convertToPG(rowEdit.Name)},
            'null',
            ${this.convertToPG(providerId)},
            ${this.convertToPG(rowEdit.StartDate)},
            ${this.convertToPG(rowEdit.EndDate)},
            ${this.convertToPG(rowEdit.Way)},
            '1' //deliverytypeid,
            ${this.convertToPG(userId)},
            ${this.convertToPG(routeNumber)},
            
        );`);
        return query;
    }
}

module.exports = MyRepository;
