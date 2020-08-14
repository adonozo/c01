import { ObjectId } from "mongodb";
import { Recipe } from "../../../core/domain/recipe";
import { MongoIngredientMetadata } from "./ingredient-metadata-mongo";
import { IngredientMetadata } from "../../../core/domain/ingredient-metadata";
import { IngredientMongo } from "./ingredient-mongo";

export class RecipeMongo {
    public _id: ObjectId;
    public id: string;
    public name: string;
    public description: string;
    public ingredients: (MongoIngredientMetadata | IngredientMetadata)[];
    public ingredientsExtra?: IngredientMongo[];

    public static toRecipe(recipeMongo: RecipeMongo): Recipe {
        const recipe = new Recipe();
        recipe.id = recipeMongo.id;
        recipe.name = recipeMongo.name;
        recipe.description = recipeMongo.description;
        if (recipeMongo.ingredientsExtra) {
            const ingredientsMetadata: IngredientMetadata[] = [];
            recipeMongo.ingredientsExtra.forEach(ingredient => {
                const index = recipeMongo.ingredients.findIndex(i =>
                    MongoIngredientMetadata.isMongoIngredient(i) ? i.id === ingredient.id : i.ingredient.id === ingredient.id);
                if (index >= 0) {
                    delete ingredient._id;
                    const ingredientFound = recipeMongo.ingredients[index];
                    ingredientsMetadata.push({
                        quantity: ingredientFound.quantity,
                        unit: ingredientFound.unit,
                        ingredient: ingredient
                    });
                }
            });
            recipe.ingredients = ingredientsMetadata;
        } else {
            recipe.ingredients = recipeMongo.ingredients as IngredientMetadata[];
        }

        return recipe;
    }

    public static toRecipeMongo(recipe: Recipe): RecipeMongo {
        const mongoRecipe = new RecipeMongo();
        mongoRecipe.id = recipe.id;
        mongoRecipe.name = recipe.name;
        mongoRecipe.description = recipe.description;
        mongoRecipe.ingredients = recipe.ingredients.map(ingredient =>
            MongoIngredientMetadata.toMongoIngredient(ingredient));
        return mongoRecipe;
    }
}

