import { Health } from "../../domain/health";

export interface HealthDaoInterface {
    getHealth(): Health;
}
