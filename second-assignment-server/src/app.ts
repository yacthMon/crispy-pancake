import express from 'express';
import * as bodyParser from 'body-parser';
import {questionRouter} from './Question';
import {answerRouter} from './Answer';

const app = express();
const port:number = 3000;
app.use(bodyParser.json());
app.use(questionRouter);
app.use(answerRouter);
app.get('/', (req, res) => {
  res.send('Express work');
});
app.listen(port);
console.log("Server listening on port : " + port);
