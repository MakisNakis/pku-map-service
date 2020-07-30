const Client= require('pg').Client;

const DBNAME = "NewBase";
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
        this.client = new Client({
            connectionString: connectionString
        });

    }

    async loadDataForMarkers(routeId) {
        try {
            await this.client.connect();
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        let query = this.client.query(`select * from f_s_subject_routeid(${routeId})`);
        // this.client.end();
        return query
    }

    async loadDataForTable(pkuId, typeTable) {
        try {
            await this.client.connect();
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        let query = undefined;

        switch (typeTable) {
            case "ОМТС":
                query = this.client.query(`select * from f_s_equipment_routeid(2);`);

                break;
            case "Монтажники1":
                query = this.client.query(`select * from f_s_subwork_perf_subid(${pkuId});`);

                break;
            case "Монтажники2":
                query = this.client.query(`select * from f_s_subhw_subid(${pkuId});`);

                break;
            case "ПТО1":
                query = this.client.query(`select * from f_s_subwork_pto_subid(${pkuId});`);
                break;
            case "ПТО2":
                query = this.client.query(`select * from f_s_subhw_subid(${pkuId});`);

                break;
            case "Отчеты1":
                query = this.client.query(`select * from f_s_report_general_routeid(2);`);

                break;
            case "Отчеты2":
                query = this.client.query(`select * from f_s_report_general_routeid(2);`);

                break;
            default:
                break;
        }
        // this.client.end();
        return query
    }

    convertToPG (data) {
        return '\''+data+'\'';
    }

    async uploadDataForTable(pkuId, typeTable, row) {

        let query = undefined;
        let user = 1; // 1 - Админ

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


}

module.exports = MyRepository;
