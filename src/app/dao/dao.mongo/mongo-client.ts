import * as mongo from 'mongodb';
import { Logger } from "../../utils/logger";

export class MongoClient {
    private static instance: MongoClient;
    private client: mongo.MongoClient;
    private readonly url = process.env.MONGO_URL || '';
    private logger = Logger.getLogger('MongoClient');

    private constructor() {
        this.logger.info(`Connecting to mongo with url: ${this.url}`);
        this.client = new mongo.MongoClient(this.url);
        mongo.MongoClient.connect(this.url, { useNewUrlParser: true }, (error, client) => {
            this.logger.info('Connected to mongo server');
            this.client = client;
        });
    }

    public static getInstance(): MongoClient {
        if (!MongoClient.instance) {
            MongoClient.instance = new MongoClient();
        }
        return MongoClient.instance;
    }

    public get mongoClient(): mongo.MongoClient {
        return this.client;
    }
}
