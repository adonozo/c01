import { Health } from "../../domain/health";

export interface HealthServiceInterface {
    getHealth(): Health;
}
