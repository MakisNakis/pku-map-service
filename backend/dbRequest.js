const Client= require('pg').Client;

const DBNAME = "PKU_mapService";
const DBLOG = "postgres";
const DBPASS = "postgres";
const DBPORT = "5433";
const connectionString = `postgressql://${DBLOG}:${DBPASS}@localhost:${DBPORT}/${DBNAME}`;

class MyRepository {

    constructor() {
        this.client = new Client({
            connectionString: connectionString
        });
    }

    async loadData() {
        try {
            await this.client.connect();
            console.log('DB has been connected');
        } catch(e) {
            console.log('Error', e)
        }

        return this.client.query("select * from sp_ngetroutetrackpointsbyid(1)");
    }

}


module.exports = MyRepository;


