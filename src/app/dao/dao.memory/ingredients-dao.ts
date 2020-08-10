import { IIngredientsDao } from "../interfaces/ingredients-dao.interface";
import { Ingredient } from "../../core/domain/ingredient";
import { IngredientType } from "../../core/domain/enums/ingredient-type.enum";
import { QueryParams } from "../../api/models/query-params";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";
import { v4 as uuid } from "uuid";

export class IngredientsDao implements IIngredientsDao {
    private ingredients: Ingredient[];

    public constructor() {
        this.ingredients = IngredientsDao.setDummyIngredients();
    }

    public ingredientExists(id: string): Promise<boolean> {
        const ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === id);
        return Promise.resolve(ingredientIndex >= 0);
    }

    public getIngredients(): Promise<Ingredient[]>;
    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    public getIngredients(queryParams?: QueryParams): Promise<Ingredient[]> {
        if (!queryParams) {
            return Promise.resolve(this.ingredients);
        }

        const filter = queryParams.filter;
        const result = this.ingredients.filter(ingredient => ingredient.name.toLowerCase().match(filter));
        return Promise.resolve(result);
    }

    private static setDummyIngredients(): Ingredient[] {
        return [
            {
                id: 'f5f9551c-3b1b-4903-b125-c6f0b5da13d6',
                name: 'Onion',
                description: 'The basic vegetable for foods',
                type: IngredientType.vegetable
            },
            {
                id: uuid(),
                name: 'Carrot',
                description: 'The basic vegatable for coock',
                type: IngredientType.vegetable
            }
        ];
    }

    public deleteIngredient(id: string): Promise<void> {
        try {
            const index = this.ingredients.findIndex(ingredient => ingredient.id === id);
            this.ingredients = this.ingredients.slice(index, 1);
            return Promise.resolve();
        }
        catch (exception) {
            throw new NotFoundException('Ingredient not found');
        }
    }

    public getIngredient(id: string): Promise<Ingredient> {
        const ingredient = this.ingredients.find(ingredient => ingredient.id === id);
        if (ingredient) {
            return Promise.resolve(ingredient);
        }
        throw new NotFoundException('Ingredient not found');
    }

    public saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
        ingredient.id =  uuid();
        return Promise.resolve(ingredient);
    }

    public updateIngredient(actualIngredient: Ingredient): Promise<Ingredient> {
        const ingredientIndex = this.ingredients.findIndex(ingredient => ingredient.id === actualIngredient.id);
        this.ingredients[ingredientIndex] = actualIngredient;
        return Promise.resolve(actualIngredient);
    }
}
