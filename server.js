const express = require('express');
const fetch = require("node-fetch");
const app = express();
const port = 5000;


const UTILS = {
    url: `http://api.openweathermap.org/data/2.5/forecast?`,
    key: '3c3674a3c13a0084561b70150037e575'
};

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api', function (req, res) {

    if (req.method === 'POST') {
        let jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
            console.log(jsonString);
            callApi(jsonString).then(data => {
                res.send(data)
            });
        });


    }

});


callApi = async (city) => {
    const response = await fetch(`${UTILS.url}q=${city}&appid=${UTILS.key}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
};





