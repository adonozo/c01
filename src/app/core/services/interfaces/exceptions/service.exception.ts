export class ServiceException extends Error {
    public constructor(message: string) {
        super(message);
        this.name = 'ServiceException';
    }
}
