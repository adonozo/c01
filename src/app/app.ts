import express = require('express');
import { HealthController } from "./api/health-controller";
import { IngredientsController } from "./api/ingredients-controller";
import { Logger } from "./utils/logger";
import bodyParser = require('body-parser');
require ('dotenv').config();

function registerControllers(app: express.Application): void {
    new HealthController(app);
    new IngredientsController(app);
}

const app: express.Application = express();
const router = express.Router();
const port = process.env.APP_PORT || 3000;
const logger = Logger.getLogger('app');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use('/', router);

app.listen(port, (): void => {
    logger.info('\n' +
        ' _____       _____  __  \n' +
        '/  __ \\     |  _  |/  | \n' +
        '| /  \\/_____| |/\' |`| | \n' +
        '| |  |______|  /| | | | \n' +
        '| \\__/\\     \\ |_/ /_| |_\n' +
        ' \\____/      \\___/ \\___/');
    logger.info(`Listening on port ${port}`);
    registerControllers(app);
});

export default app;
