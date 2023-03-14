const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();
app.use(cors());
app.use(express.json());

const coala = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
});

app.route('/coala/*')
    .get((req, res) => {
        let endpoint = req.originalUrl.replace('/coala/', '');
        if (endpoint[0] === '/') endpoint = endpoint.slice(1)

        console.log('GET Request:', endpoint);
        coala.get(endpoint)
            .then(response => {
                console.log('GET Response:', response.data);
                res.json(response.data);
            })
            .catch(err => {
                console.log('Error:', err);
            });
    })
    .post((req, res) => {
        let endpoint = req.originalUrl;
        if (endpoint[0] === '/') endpoint = endpoint.slice(1)

        const payload = req.body;

        console.log('POST Request:', endpoint, payload);
        coala.post(endpoint, payload)
            .then(response => {
                console.log('POST Response:', response.data);
                res.send(response.data);
            })
            .catch(err => {
                console.log('Error:', err);
            });
    });

app.route('/ping')
    .get((req, res) => res.send('Hello world'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log('Server running on port:', port));

module.exports = app;