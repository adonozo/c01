import { Health } from "../../core/domain/health";

export interface HealthDaoInterface {
    getHealth(): Health;
}
