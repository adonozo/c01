import { ObjectId } from "mongodb";
import { IngredientUnit } from "../../../core/domain/enums/ingredient-unit.enum";
import { Recipe } from "../../../core/domain/recipe";

export class RecipeMongo {
    public _id: ObjectId;
    public id: string;
    public name: string;
    public description: string;
    public ingredients: IngredientMetadata[];
    
    public static toRecipe(recipe: RecipeMongo): Recipe {
        return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            ingredients: []
        }
    }

    public static toRecipeMongo(recipe: Recipe): RecipeMongo {
        const mongoRecipe = new RecipeMongo();
        mongoRecipe.id = recipe.id;
        mongoRecipe.name = recipe.name;
        mongoRecipe.description = recipe.description;
        mongoRecipe.ingredients = [];
        return mongoRecipe;
    }
}

interface IngredientMetadata {
    id: string;
    quantity: number;
    unit: IngredientUnit;
}
