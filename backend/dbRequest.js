const Client= require('pg').Client;

const DBNAME = "PKU_MapService";
const DBLOG = "postgres";
const DBPASS = "postgres";
const DBPORT = "5432";
const connectionString = `postgressql://${DBLOG}:${DBPASS}@localhost:${DBPORT}/${DBNAME}`;

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

    async loadDataForTable(pkuId, typeTable, flag) {
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
                    // if (flag === "out"){
                        query = this.client.query(`select * from f_s_subhw_subid(${pkuId});`);
                    // }
                    // if (flag === "in") {
                    //     query = this.client.query(`select * from ;`);
                    // }
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
