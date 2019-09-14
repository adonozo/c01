import { IngredientsServiceInterface } from "../interfaces/ingredients-service.interface";
import { Ingredient } from "../../domain/ingredient";
import { ObjectID } from "bson";
import { IngredientType } from "../../domain/ingredient-type.enum";

export class IngredientsServiceStub implements IngredientsServiceInterface {
    public getAllIngredients(): Promise<Ingredient[]> {
        return Promise.resolve([]);
    }

    public createIngredient(ingredient: Ingredient): Promise<Ingredient> {
        return Promise.resolve(ingredient);
    }

    public deleteIngredient(): Promise<void> {
        return Promise.resolve();
    }

    public getIngredient(): Promise<Ingredient> {
        return Promise.resolve({
            _id: new ObjectID('507f1f77bcf86cd799439011'),
            name: 'Dummy ingredient',
            description: 'Empty description',
            type: IngredientType.vegetable
        });
    }

    public getIngredients(): Promise<Ingredient[]> {
        return Promise.resolve([]);
    }

    public updateIngredient(): Promise<void> {
        return Promise.resolve();
    }
}
