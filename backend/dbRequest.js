const Client= require('pg').Client;

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
                // query.secondQuery = this.client.query(`select * from f_s_subhw_subid(pkuId);`);
                break;
            case "Монтажники2":
                // query = this.client.query(`select * from f_s_subwork_perf_subid(${pkuId});`);
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
//test commit

}

module.exports = MyRepository;
