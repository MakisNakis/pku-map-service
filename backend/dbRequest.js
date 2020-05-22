const Client= require('pg').Client;
// const express = require('express');
// const app = express();

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
            console.log('connected');
        } catch(e) {
            console.log('error', e)
        }

        return this.client.query("select * from sp_ngetroutetrackpointsbyid(1)");
    }

}

// const repository = new MyRepository();
//
// app.get('/api/test', async (req, res) => {
//     const data = await repository.loadData();
//     res.json(data);
//
// });
//



module.export = MyRepository;


// client.query('select * from sp_ngetroutetrackpointsbyid(1)', (err, res) => {
//    console.log(err,res);
//    client.end();
// });
