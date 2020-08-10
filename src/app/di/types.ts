export const TYPES = {
    // DAOs
    MongoClient: Symbol('MongoClient'),
    IngredientsDao: Symbol('IngredientsDao'),
    HealthDao: Symbol('HealthDao'),
    RecipeDao: Symbol('RecipesDao'),

    // Services
    IngredientsService: Symbol('IngredientsService'),
    HealthService: Symbol('HealthService'),
    Service: Symbol('Service'),
    RecipeService: Symbol('RecipesService')
}
