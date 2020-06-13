import "reflect-metadata";

import express = require('express');
import { Logger } from "./utils/logger";
import bodyParser = require('body-parser');
import { Routes } from "./api/routes";
import { Application } from "express";
require ('dotenv').config();

class App {
    public app: Application;

    public constructor() {
        this.app = express();
        this.initRoutes();
        this.startService();
    }

    private initRoutes(): void {
        const router = express.Router();
        const controllerRoutes = new Routes(router);

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
        this.app.use('/api/v1', controllerRoutes.Routes);
    }

    private startService(): void {
        const port = process.env.APP_PORT || 3000;
        const logger = Logger.getLogger('app');

        this.app.listen(port, (): void => {
            logger.info('\n' +
                ' _____       _____  __  \n' +
                '/  __ \\     |  _  |/  | \n' +
                '| /  \\/_____| |/\' |`| | \n' +
                '| |  |______|  /| | | | \n' +
                '| \\__/\\     \\ |_/ /_| |_\n' +
                ' \\____/      \\___/ \\___/');
            logger.info(`Listening on port ${port}`);
        });
    }
}

const { app } = new App();
export default app;
