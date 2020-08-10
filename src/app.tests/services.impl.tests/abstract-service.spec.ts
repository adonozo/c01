import { DummyService } from "./utils/dummy-service";
import { expect } from  "chai";
import { NotFoundException } from "../../app/core/services/interfaces/exceptions/not-found.exception";
import { ServiceException } from "../../app/core/services/interfaces/exceptions/service.exception";

describe('AbstractServiceTests', () => {
    const service = new DummyService();

    it('should return a Not Found error', async () => {
        const error = new Error('test error');
        error.name = 'NotFound';
        try {
            await service.throwError(error);
        } catch (e) {
            expect(e).to.be.instanceOf(NotFoundException);
        }
    });

    it('should return a Service error on any error', async () => {
        const error = new Error('test error');
        try {
            await service.throwError(error);
        } catch (e) {
            expect(e).to.be.instanceOf(ServiceException);
        }
    });
});
