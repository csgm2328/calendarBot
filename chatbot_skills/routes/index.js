'use strict';

const config = require('config')
const express = require('express');
const router = express.Router();
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = express.Router();
const dir = path.join(__dirname, 'public');//static access point 지정

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir)); //express library static 기능
app.use('/api', apiRouter);
app.use('/', router);

module.exports = router;
