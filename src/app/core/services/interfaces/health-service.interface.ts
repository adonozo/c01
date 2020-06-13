import { Health } from "../../domain/health";

export interface IHealthService {
    getHealth(): Health;
}
