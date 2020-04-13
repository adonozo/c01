import { IngredientsDaoInterface } from "../interfaces/ingredients-dao.interface";
import { DaoFactoryInterface } from "../interfaces/dao-factory.interface";
import { Ingredient } from "../../core/domain/ingredient";
import { ObjectId } from "bson";
import { IngredientType } from "../../core/domain/ingredient-type.enum";
import { QueryParams } from "../../core/domain/api-rest/query-params";
import { NotFoundException } from "../interfaces/exceptions/not-found.exception";

export class IngredientsDao implements IngredientsDaoInterface, DaoFactoryInterface<IngredientsDao> {
    private ingredients: Ingredient[];

    public constructor() {
        this.ingredients = IngredientsDao.setDummyIngredients();
    }

    public create(): IngredientsDao {
        return new IngredientsDao();
    }

    public ingredientExists(id: string): Promise<boolean> {
        const ingredientIndex = this.ingredients.findIndex(ingredient => ingredient._id.equals(id));
        return Promise.resolve(ingredientIndex >= 0);
    }

    public getIngredients(): Promise<Ingredient[]>;
    public getIngredients(queryParams: QueryParams): Promise<Ingredient[]>;

    public getIngredients(queryParams?: QueryParams): Promise<Ingredient[]> {
        if (!queryParams){
            return Promise.resolve(this.ingredients);
        }

        const filter = queryParams.filter;
        const result = this.ingredients.filter(ingredient => ingredient.name.toLowerCase().match(filter));
        return Promise.resolve(result);
    }

    private static setDummyIngredients(): Ingredient[] {
        return [
            {
                _id: new ObjectId('507f1f77bcf86cd799439011'),
                name: 'Onion',
                description: 'The basic vegetable for foods',
                type: IngredientType.vegetable
            },
            {
                _id: new ObjectId(),
                name: 'Carrot',
                description: 'The basic vegatable for coock',
                type: IngredientType.vegetable
            }
        ];
    }

    public deleteIngredient(id: string): Promise<void> {
        try {
            const index = this.ingredients.findIndex(ingredient => ingredient._id.equals(id));
            this.ingredients = this.ingredients.slice(index, 1);
            return Promise.resolve();
        }
        catch (exception) {
            throw new NotFoundException('Ingredient not found');
        }
    }

    public getIngredient(id: string): Promise<Ingredient> {
        const ingredient = this.ingredients.find(ingredient => ingredient._id.equals(id));
        if (ingredient) {
            return Promise.resolve(ingredient);
        }
        throw new NotFoundException('Ingredient not found');
    }

    public saveIngredient(ingredient: Ingredient): Promise<Ingredient> {
        ingredient._id =  new ObjectId();
        return Promise.resolve(ingredient);
    }

    public updateIngredient(actualIngredient: Ingredient): Promise<void> {
        const ingredientIndex = this.ingredients.findIndex(ingredient => ingredient._id.equals(actualIngredient._id));
        this.ingredients[ingredientIndex] = actualIngredient;
        return Promise.resolve();
    }
}
