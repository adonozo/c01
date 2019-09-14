export class NotFoundException extends Error {
    public constructor(message: string) {
        super(message);
    }
}
