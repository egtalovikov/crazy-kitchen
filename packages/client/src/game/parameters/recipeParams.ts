import { Ingredients } from '../types/ingredients'
import { Recipes, TRecipeParameters } from '../types/recipe'
import totalBurgerImage from '@assets/ingredients/totalBurger.png'

// TODO: store burger ingredients in recipe
const recipeParameters: Record<Recipes, TRecipeParameters> = {
  [Recipes.Burger]: {
    width: 200,
    height: 200,
    //imageSrc: totalBurgerImage,
    // todo create full sprite
    imageSrc: totalBurgerImage,
    frameWidth: 100,
    recipe: {
      // [Ingredients.Cheese]: 1,
      [Ingredients.Cutlet]: {
        quantity: 1,
        index: 1,
      },
      [Ingredients.Salad]: {
        quantity: 1,
        index: 2,
      },
      [Ingredients.Tomato]: {
        quantity: 1,
        index: 3,
      },
      [Ingredients.Bread]: {
        quantity: 1,
        index: 0,
      },
    },
  },
}

export default recipeParameters
