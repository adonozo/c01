import { IIngredientsService } from "../interfaces/ingredients-service.interface";
import { Ingredient } from "../../domain/ingredient";
import { IngredientType } from "../../domain/enums/ingredient-type.enum";
import { QueryParams } from "../../../api/models/query-params";

export class IngredientsServiceStub implements IIngredientsService {
    public getIngredients(queryParams?: QueryParams): Promise<Ingredient[]>;
    public getIngredients(): Promise<Ingredient[]>;

    public getIngredients(): Promise<Ingredient[]> {
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
            id: 'f5f9551c-3b1b-4903-b125-c6f0b5da13d6',
            name: 'Dummy ingredient',
            description: 'Empty description',
            type: IngredientType.vegetable
        });
    }

    public updateIngredient(id: string, ingredient: Ingredient): Promise<Ingredient> {
        return Promise.resolve(ingredient);
    }
}
