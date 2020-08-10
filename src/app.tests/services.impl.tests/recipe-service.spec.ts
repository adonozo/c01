import { expect } from 'chai';
import { Recipe } from "../../app/core/domain/recipe";
import { RecipesService } from "../../app/core/services/services.impl/recipes-service";
import { RecipesDao } from "../../app/dao/dao.memory/recipes-dao";
import { QueryParams } from "../../app/api/models/query-params";
import { NotFoundException } from "../../app/core/services/interfaces/exceptions/not-found.exception";

describe('RecipesService', () => {
    const defaultId = '188461a3-33e8-40b6-82c7-3d0699a7f8fa';
    const defaultRecipe = (id: string): Recipe => {
        return {
            id: id,
            name: 'Soup',
            description: 'Quick soup',
            ingredients: []
        }
    }
    let service: RecipesService;

    beforeEach(() => {
        const dao = new RecipesDao();
        service = new RecipesService(dao);
    });

    it('should return a non empty array', async () => {
        const recipes = await service.getRecipes();
        expect(recipes.length).to.be.greaterThan(0);
    });

    it('should return a non empty array on query params', async () => {
        const queryParams = QueryParams.defaultParams;
        const recipes = await service.getRecipes(queryParams);
        expect(recipes.length).to.be.greaterThan(0);
    });

    it('should return a valid recipe object', async () => {
        const recipe = await service.getRecipe(defaultId);
        expect(recipe).to.have.any.keys('id', 'names', 'description', 'ingredients');
    });

    it('should throw an error on recipe not found', async () => {
        try {
            await service.getRecipe('5123c2a3de1090f');
            expect.fail('Expected error was not thrown');
        } catch (e) {
            expect(e).to.be.instanceOf(NotFoundException);
        }
    });

    it('should not throw an error updating an ingredient', async () => {
        const recipe = defaultRecipe(defaultId);
        const serviceCall = (): Promise<Recipe> => service.updateRecipe(defaultId, recipe);
        expect(await serviceCall).to.not.throw(Error);
    });

    it('should remove a recipe', async () => {
        const recipes = await service.getRecipes();
        const recipeLength = recipes.length;
        await service.deleteRecipe(defaultId);
        const actualRecipes = await service.getRecipes();
        const actualLength = actualRecipes.length;
        expect(actualLength).to.be.equal(recipeLength - 1);
    });
});
