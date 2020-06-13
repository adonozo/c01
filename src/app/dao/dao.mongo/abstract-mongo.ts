import { MongoClient } from "./mongo-client";
import { Logger } from "../../utils/logger";
import { Collection } from "mongodb";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
require ('dotenv').config();

@injectable()
export abstract class AbstractMongo {
    private dbName = process.env.MONGO_DATABASE || 'c01';
    private mongoClient: MongoClient;
    private abstractLogger = Logger.getLogger('AbstractMongo');

    protected constructor(@inject(TYPES.MongoClient) mongoClient: MongoClient) {
        this.abstractLogger.info(`Creating dao for database: ${this.dbName}`);
        this.mongoClient = mongoClient;
    }

    protected async runQuery<TCollection, TResult>(
        query: (collection: Collection<TCollection>) => Promise<TResult>,
        collection: string): Promise<TResult> {

        const client = await this.mongoClient.getClient();
        const database = client.db(this.dbName);
        const mongoCollection = database.collection<TCollection>(collection);
        return this.handleQuery(async () => await query(mongoCollection), collection);
    }

    private handleQuery<T>(query: () => T, collection: string): T {
        try {
            return query()
        } catch (exception) {
            this.abstractLogger.error(`Error trying to execute query in ${collection}, ${exception.stack}`);
            throw exception;
        }
    }
}
