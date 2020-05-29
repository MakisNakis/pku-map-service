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

for (let i = 0; i < 200; i++){
    app.get(`/api/pkuDataServerPKUTable${i}`, async (req, res) => {
        const data = await repository.loadDataForTable(i);
        res.json(data);
    });
}




