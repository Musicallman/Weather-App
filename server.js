const express = require('express');
const fetch = require("node-fetch");
const app = express();
const port = 5000;

const UTILS = {
    url: `http://api.openweathermap.org/data/2.5/forecast?`,
    key: '3c3674a3c13a0084561b70150037e575'
};

app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('weather', {});
});

app.post('/api', (req, res) => {

    if (req.method === 'POST') {
        let jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
            console.log(`user searched weather in ${jsonString}`);
            callApi(jsonString)
                .then(data => res.send(data))
                .catch((err) => {
                    console.error(err);
                    res.send({
                        error: true,
                        message: err
                    });
                });
        });
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));


callApi = async (city) => {
    const response = await fetch(`${UTILS.url}q=${city}&appid=${UTILS.key}`);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
        return {error: true, message: body.message};
    }

    return body;
};





