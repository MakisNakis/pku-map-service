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

        let query = this.client.query(`select * from f_select_subject_routeid(${routeId})`);
        // this.client.end();
        return query
    }

    async loadDataForTable(pkuId) {
        try {
            await this.client.connect();
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }
        let query = this.client.query(`select * from f_select_hardware_subid(${pkuId})`);
        // this.client.end();
        return query
    }
}

module.exports = MyRepository;
