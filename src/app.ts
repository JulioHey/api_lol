import {
    Express,
    Router,
    json
} from "express";
import express from "express";

import cors from 'cors';


export default class App {
    app: Express;


    constructor() {
        this.app = express();

        this.initializeMiddleWares();
    }

    initializeMiddleWares() {
        this.app.use(json());
        this.app.use(cors());
    }

    initializeRouter(routes: Router) {
        this.app.use(routes);
    }

    initializeServer(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running in port: ${port}!`)
        });
    }
}