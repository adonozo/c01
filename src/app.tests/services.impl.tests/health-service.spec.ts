import chai from 'chai';
import { HealthService } from "../../app/core/services/services.impl/health-service";
import { HealthDao } from "../../app/dao/dao.memory/health-dao";

const expect = chai.expect;

describe('HealthService', () => {
    it('should return a health object', () => {
        const dao = new HealthDao();
        const service = new HealthService(dao);
        const health = service.getHealth();
        expect(health).to.include.all.keys('id', 'version');
    });
});
