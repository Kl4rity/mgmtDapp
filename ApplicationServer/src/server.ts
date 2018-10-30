import App from './app';
import * as debug from 'debug';
import * as express from 'express';

class Server {
    private app : express.Application;
    private debug : debug.IDebugger;
    private port : Number;

    constructor(){
        this.app = new App().express;
        this.debug = debug("server");
        this.port = Number.parseInt(process.env.PORT) || 3000;

        this.startServer();
    }

    private startServer(){
        this.app.listen(this.port);

        if(process.env.port != null){
            this.debug("Port Number sourced from Environment.");
        }

        console.log(`Server started on port ${this.port}.`);
    }
}

// Creating a server instance.
new Server();