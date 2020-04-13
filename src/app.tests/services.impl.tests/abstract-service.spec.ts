import { DummyService } from "./utils/dummy-service";
import { expect } from  "chai";
import { NotFoundException } from "../../app/core/services/interfaces/exceptions/not-found.exception";
import { ServiceException } from "../../app/core/services/interfaces/exceptions/service.exception";

describe('AbstractServiceTests', () => {
    const service = new DummyService();

    it('should return a Not Found error', () => {
        const error = new Error('test error');
        error.name = 'NotFound';
        const result = (): void => service.throwError(error);
        expect(result).throw(NotFoundException);
    });

    it('should return a Service error on any error', () => {
        const error = new Error('test error');
        const result = (): void => service.throwError(error);
        expect(result).throw(ServiceException);
    });
});
