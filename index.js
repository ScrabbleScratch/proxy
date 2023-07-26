import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
});

app.route('/:client/*')
    .get((req, res) => {
        const reqId = Date.now();
  
        const client = req.params.client;
        const endpoint = req.params[0];

        console.log(`➡ (${reqId}) GET Request <${client}>:`, endpoint);
        api.get(endpoint)
            .then(response => {
                console.log(`⬅ (${reqId}) GET Response <${client}>:`, response.data);
                res.json(response.data);
            })
            .catch(error => {
                console.log(`⬅ (${reqId}) Error on GET request <${client}>:`, endpoint);
                res.sendStatus(error.response.status);
            });
    })
    .post((req, res) => {
        const reqId = Date.now();
  
        const client = req.params.client;
        const endpoint = req.params[0];
        const payload = req.body;

        console.log(`➡ (${reqId}) POST Request <${client}>:`, endpoint, payload);
        api.post(endpoint, payload)
            .then(response => {
                console.log(`⬅ (${reqId}) POST Response <${client}>:`, response.data);
                res.send(response.data);
            })
            .catch(error => {
                console.log(`⬅ (${reqId}) Error on POST request <${client}>:`, endpoint, payload);
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

export default app;