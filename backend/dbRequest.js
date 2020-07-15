const moment = require('moment');
const Sequelize = require('sequelize');

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

    convertToPG (data) {
        return '\''+data+'\'';
    }

    async uploadDataForTable(pkuId, typeTable, row) {

        let query = undefined;
        let user = 1; // 1 - Админ
        let user1 = '---';

        console.log(row);

        switch (typeTable) {
            case "ОМТС":
                let DateContract = null;
                let DatePlan = null;
                let DateFact = null;
                if(row.DateContract !== null) {
                    DateContract = this.convertToPG(row.DateContract);
                }
                if(row.DatePlan !== null) {
                    DatePlan = this.convertToPG(row.DatePlan);
                }

                if(row.DateFact !== null) {
                    DateFact = this.convertToPG(row.DateFact);
                }

                query = this.client.query(`select * from f_u_equipment(
                    ${row.DeliveryID}, 
                    ${DateContract}, 
                    ${DatePlan}, 
                    ${DateFact}, 
                    ${row.Quantity}, 
                    ${this.convertToPG(row.Comment)},
                    ${user}
                );`);
                break;
            case "Монтажники1":
                let DateWork = null;
                if(row.DateWork !== null) {
                    DateWork = this.convertToPG(row.DateWork);
                }

                query = this.client.query(`select * from f_u_subwork_perf(
                    ${row.WorkID},
                    ${DateWork},
                    ${this.convertToPG(row.Fact)},
                    ${user},
                    ${this.convertToPG(row.Comment)},
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
                    ${this.convertToPG(row.Comment)},
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
