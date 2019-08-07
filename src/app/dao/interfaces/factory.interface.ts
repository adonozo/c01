import { DaoFactoryInterface } from "./dao-factory.interface";

export interface FactoryInterface {
    createDao<T1, T2 extends DaoFactoryInterface<T2>>(type: { new(): T2 }): T2;
}
