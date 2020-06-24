const express = require('express');
const MyRepository = require('./dbRequest');
const app = express();

const port = 5000;
const repository = new MyRepository();

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/api/test', async (req, res) => {
    const pkuDataServer = [
        {id: 1, name: "Peter", lastName: "Griffin"},
        {id: 2, name: "Jack", lastName: "Sparrow"},
        {id: 3, name: "Steve", lastName: "Smith"}
    ];
    res.json(pkuDataServer);

});


app.get('/api/pkuDataServerFirstRoute', async (req, res) => {
    const data = await repository.loadDataForMarkers(1);
    res.json(data);
});

app.get('/api/pkuDataServerSecondRoute', async (req, res) => {
    const data = await repository.loadDataForMarkers(2);
    res.json(data);
});




// for (let i = 0; i < 40; i++){
//     app.get(`/api/pkuDataServerPKUTable/OMTS/${i}`, async (req, res) => {
//         const data = await repository.loadDataForTable(i, "ОМТС");
//         res.json(data);
//     });
// }
//
// for (let i = 0; i < 40; i++){
//     app.get(`/api/pkuDataServerPKUTable/PTO/${i}`, async (req, res) => {
//         const data = await repository.loadDataForTable(i, "ПТО");
//         res.json(data);
//     });
// }
//
// for (let i = 0; i < 40; i++){
//     app.get(`/api/pkuDataServerPKUTable/Montazhniki/${i}`, async (req, res) => {
//         const data = await repository.loadDataForTable(i, "Монтажники");
//         res.json(data);
//     });
// }

for (let i = 0; i < 40; i++){
    app.get(`/api/pkuDataServerPKUTable/Otchety/${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i, "Отчеты");
        res.json(data);
    });
}




