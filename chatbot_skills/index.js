const express = require('express');
const path = require('path');//경로생성
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const router = express.Router();
const apiRouter = express.Router();
const dir = path.join(__dirname, 'public');//static access point 지정

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dir)); //express library static 기능
app.use('/api', apiRouter);
app.use('/', router);

//-----------------------secret setting----------------------------------

app.listen(3000, function () {
  console.log('Example skill server listening on port 3000!');
});

