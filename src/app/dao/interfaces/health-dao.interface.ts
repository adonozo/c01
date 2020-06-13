import { Health } from "../../core/domain/health";

export interface IHealthDao {
    getHealth(): Health;
}
