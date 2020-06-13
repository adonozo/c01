import { Container } from "inversify";
import { MongoClient } from "../dao/dao.mongo/mongo-client";
import { TYPES } from "./types";
import { IngredientsDao } from "../dao/dao.mongo/ingredients-dao";
import { HealthDao } from "../dao/dao.memory/health-dao";
import { HealthService } from "../core/services/services.impl/health-service";
import { IngredientsService } from "../core/services/services.impl/ingredients-service";
import { IIngredientsService } from "../core/services/interfaces/ingredients-service.interface";
import { IHealthService } from "../core/services/interfaces/health-service.interface";
import { IIngredientsDao } from "../dao/interfaces/ingredients-dao.interface";
import { IHealthDao } from "../dao/interfaces/health-dao.interface";
import { IService } from "../core/services/facade/service.interface";
import { Service } from "../core/services/facade/service";

const container = new Container();
container.bind<MongoClient>(TYPES.MongoClient).toConstantValue(MongoClient.Instance);
container.bind<IIngredientsDao>(TYPES.IngredientsDao).to(IngredientsDao);
container.bind<IHealthDao>(TYPES.HealthDao).to(HealthDao).inSingletonScope();

container.bind<IService>(TYPES.Service).to(Service);
container.bind<IIngredientsService>(TYPES.IngredientsService).to(IngredientsService);
container.bind<IHealthService>(TYPES.HealthService).to(HealthService);

export default container;
