import * as mongo from 'mongodb';
import { MongoClient } from "./mongo-client";
import { Logger } from "../../utils/logger";
require ('dotenv').config();

export abstract class AbstractMongo {
    private dbName = process.env.MONGO_DATABASE || 'c01';
    private mongoClient: MongoClient;
    private logger = Logger.getLogger('AbstractMongo');

    public constructor() {
        this.logger.info(`Creating dao for database: ${this.dbName}`);
        this.mongoClient = MongoClient.getInstance();
    }

    protected executeQuery<T>(query: (collection: mongo.Collection<T>) => Promise<T>, collectionName: string): Promise<T> {
        return this.handleQuery(() => {
            this.logger.info(`Getting data from collection: ${collectionName}`);
            const collection = this.mongoClient.mongoClient.db(this.dbName).collection(collectionName);
            return query(collection);
        }, collectionName)
    }

    protected executeVoidQuery<T>(query: (collection: mongo.Collection<T>) => void, collectionName: string): Promise<void> {
        return this.handleQuery(() =>{
            this.logger.info(`Executing query from collection: ${collectionName}`);
            const collection = this.mongoClient.mongoClient.db(this.dbName).collection(collectionName);
            query(collection);
            return Promise.resolve();
        }, collectionName);
    }

    private handleQuery<T>(query: () => T, collection: string): T {
        try {
            return query()
        } catch (exception) {
            this.logger.error(`Error trying to execute query in ${collection}, ${exception.stack}`);
            throw exception;
        }
    }
}
