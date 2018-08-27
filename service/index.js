const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: 'e0297837',
  apiSecret: 'a453c6c8d6327016'
})

const corsOptions = {
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	allowedHeaders: ['Content-Type'],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000);

exports.app = app;
exports.nexmo = nexmo;

require('./db/users').createTable();
require('./db/verify').createTable();
require('./route');

