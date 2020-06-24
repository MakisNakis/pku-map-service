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

    async loadDataForTable(pkuId, depName) {
        try {
            await this.client.connect();
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        let query = undefined;

        switch (depName) {
            case "ОМТС":
                query = this.client.query(`select * from f_s_equipment_routeid(1);`);
                break;
            case "Монтажники":
                query = this.client.query(`select * from f_s_subwork_perf_subid(pkuId);`);
                // query.secondQuery = this.client.query(`select * from f_s_subhw_subid(pkuId);`);
                break;
            case "ПТО":
                query = this.client.query(`select * from f_s_subwork_pto_subid(pkuId);`);
                // query.secondQuery = this.client.query(`select * from f_s_subhw_subid(pkuId);`);
                break;
            case "Отчеты":
                query = this.client.query(`select * from f_s_report_general_routeid(pkuId);`);
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
