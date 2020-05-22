// var pgp = require("pg-promise");
//
// const DBNAME = "PKU_mapService";
// const DBLOG = "postgres";
// const DBPASS = "postgres";
// const DBPORT = "5433";
//
// const connectionString = `postgres://${DBLOG}:${DBPASS}@localhost:${DBPORT}/${DBNAME}`;
//
// // var db = pgp("postgres://postgres:postgres@localhost:5433/PKU_mapService");
// var db = pgp(connectionString);
//
//
// db.one("select * from sp_ngetroutetrackpointsbyid(1)")
//     .then(function (data) {
//         console.log("DATA:", data.value);
//     })
//     .catch(function (e) {
//         console.log("ERROR:", e)
//     });
