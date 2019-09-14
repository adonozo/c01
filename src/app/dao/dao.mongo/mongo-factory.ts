import { DaoFactoryInterface } from "../interfaces/dao-factory.interface";
import { FactoryInterface } from "../interfaces/factory.interface";

export class MongoFactory implements FactoryInterface {
    public createDao<T1, T2 extends DaoFactoryInterface<T2>>(type: { new(): T2 }): T2 {
        return new type();
    }
}
