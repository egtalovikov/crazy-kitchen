import DishIngredient from '../objects/ingredients/dishIngredient'
import { Ingredients } from '../types/ingredients'
import { TRecipe } from '../types/recipe'

class RecipeHelper {
  // TODO decide if we need this method?
  /* public static recipesAreEqual(recipe1: TRecipe, recipe2: TRecipe): boolean {
    for (const key in recipe1) {
      const ingredient = key as unknown as Ingredients
      const recipeParam = recipe1[ingredient]
      if (recipeParam.quantity !== recipe2[ingredient].quantity) {
        return false
      }
    }
    return true
  } */

  // TODO: now its 1 recipe for different types of burgers, is it ok?
  public static ingredientsFitsRecipe(
    recipe: TRecipe,
    ingredients: DishIngredient[]
  ): boolean {
    let result = true
    for (const key in recipe) {
      const ingredientType = key as unknown as Ingredients
      const recipeParam = recipe[ingredientType]
      const ingredientOFType = ingredients.filter(i => i.type == ingredientType)
      if (
        (recipeParam.quantity > 0 && ingredientOFType.length == 0) ||
        (recipeParam.quantity == 0 && ingredientOFType.length > 0)
      ) {
        result = false
      }
    }
    return result
  }
}

export default RecipeHelper
