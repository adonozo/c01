import * as mongo from 'mongodb';
import { Logger } from "../../utils/logger";
import { MongoClient as Client } from "mongodb";
import { injectable } from "inversify";

@injectable()
export class MongoClient {
    private static instance: MongoClient;
    private readonly client: mongo.MongoClient;
    private readonly url = process.env.MONGO_URL || '';
    private logger = Logger.getLogger('MongoClient');

    private constructor() {
        this.client = new Client(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    public static get Instance(): MongoClient {
        if (!MongoClient.instance) {
            MongoClient.instance = new MongoClient();
        }

        return MongoClient.instance;
    }

    public async getClient(): Promise<Client> {
        if (!this.client || !this.client.isConnected()) {
            this.logger.info(`Connecting to mongo with url: ${this.url}`);
            await this.client.connect();
        }

        return this.client;
    }
}
