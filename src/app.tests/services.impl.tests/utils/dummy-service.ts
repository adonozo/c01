import { AbstractService } from "../../../app/core/services/services.impl/abstract-service";
import * as winston from "winston";
import { Logger } from "../../../app/utils/logger";

export class DummyService extends AbstractService {
    public get defaultLogger(): winston.Logger {
        return Logger.getLogger('HealthService');
    }

    public throwError(error: Error): void {
        this.handle(() => {
            throw error;
        })
    }
}
