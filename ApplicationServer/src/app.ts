import * as express from 'express';
import * as morgan from 'morgan';
import * as debug from 'debug';

import {Request, Response} from 'express';

import User from './models/User';
import DBService from './util/dbUtil';

class App {
    public express : express.Application;
    private debug : debug.IDebugger;

    constructor(){
        this.debug = debug("app");

        this.express = express();
        this.mountLogger();
        this.connectToDb();
        this.mountRoutes();
    }

    mountLogger(){
        this.express.use(morgan('short'));
    };

    connectToDb(){
        // Runs a Utility function that establishes the DB connection for the global mongoose object.
        DBService.connect();
    }

    mountRoutes(){
        // Routers should be mounted here. This, so far, only mounts a single route for debugging purposes.
        this.express.use('/', (req : Request, res : Response) => {
            User.find({}).then((value) => {
                res.json(value);
            });
        });
    };
}

export default App;