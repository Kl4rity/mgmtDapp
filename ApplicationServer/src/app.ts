import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';

import User from './models/User';
import Debug from 'debug';
import DBService from './util/dbUtil';

// debug is not running.
const debug = new Debug("app");

const app : express.Application = express();
const port : any = process.env.PORT || 3000;

// Runs a Utility function that establishes the DB connection
DBService.connect();

debug(process.env.port);

app.use(morgan('short'));


app.use('/', (req, res) => {
    User.find({}).then((value) => {
        res.json(value);
    });
});

app.listen(port);

console.log(`Server started on port ${port}.`);