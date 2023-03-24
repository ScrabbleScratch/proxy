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
        const endpoint = req.originalUrl.replace('/coala/', '');

        console.log('GET Request:', endpoint);
        coala.get(endpoint)
            .then(response => {
                console.log('GET Response:', response.data);
                res.json(response.data);
            })
            .catch(error => {
                console.log('Error on GET request:', endpoint);
                res.sendStatus(error.response.status);
            });
    })
    .post((req, res) => {
        const endpoint = req.originalUrl.replace('/coala/', '');
        const payload = req.body;

        console.log('POST Request:', endpoint, payload);
        coala.post(endpoint, payload)
            .then(response => {
                console.log('POST Response:', response.data);
                res.send(response.data);
            })
            .catch(err => {
                console.log('Error on POST request:', endpoint, payload);
                res.sendStatus(error.response.status);
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