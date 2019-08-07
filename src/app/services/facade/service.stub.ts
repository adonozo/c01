import { AbstractService } from "./abstract-service";
import { HealthServiceInterface } from "../interfaces/health-service.interface";
import { HealthServiceStub } from "../services.stub/health-service.stub";

export class ServiceStub implements AbstractService {

    public get HealthService(): HealthServiceInterface {
        return new HealthServiceStub();
    }
}
