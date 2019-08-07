import express = require('express');
import { HealthController } from "./api/health-controller";
require ('dotenv').config();

function registerControllers(app: express.Application): void {
    new HealthController(app);
}

const app: express.Application = express();
const port = process.env.APP_PORT || 3000;

app.listen(port, (): void => {
    console.log('' +
        ' _____       _____  __  \n' +
        '/  __ \\     |  _  |/  | \n' +
        '| /  \\/_____| |/\' |`| | \n' +
        '| |  |______|  /| | | | \n' +
        '| \\__/\\     \\ |_/ /_| |_\n' +
        ' \\____/      \\___/ \\___/');
    console.log(`Listening on port ${port}`);
    registerControllers(app);
});

export default app;
