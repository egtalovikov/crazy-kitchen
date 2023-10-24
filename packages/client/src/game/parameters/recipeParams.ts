import { Ingredients } from '../types/ingredients'
import { BurgerTypes, RecipeTypes, TRecipeParameters } from '../types/recipe'
// TODO: add proper images
import totalBurgerImage from '@assets/ingredients/totalBurger.png'
import tomatoBurgerImage from '@assets/ingredients/burgerTomatoSalad.png'
import saladBurgerImage from '@assets/ingredients/burgerCheeseSalad.png'
import simpleBurgerImage from '@assets/ingredients/burgerBread.png'

// TODO: store burger ingredients in recipe
const recipeParameters: Record<RecipeTypes, TRecipeParameters> = {
  [RecipeTypes.Burger]: {
    width: 200,
    height: 200,
    imageSrc: totalBurgerImage,
    frameWidth: 100,
    recipe: {
      // this is not a dish recipe
      // it is rules that define if ingredient can be added to dish
      // TODO: is this solution is ok?
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

// TODO: need to have indexes somewhere in 1 place
// is TRecipe ok? may be we should store only ingredients that are used in order,
// e.g. only bread and cutlet in simple burger
export const burgerRecipes: Record<BurgerTypes, TRecipeParameters> = {
  [BurgerTypes.Simple]: {
    width: 200,
    height: 200,
    imageSrc: simpleBurgerImage,
    frameWidth: 100,
    recipe: {
      [Ingredients.Cutlet]: {
        quantity: 1,
        index: 1,
      },
      [Ingredients.Salad]: {
        quantity: 0,
        index: 2,
      },
      [Ingredients.Tomato]: {
        quantity: 0,
        index: 3,
      },
      [Ingredients.Bread]: {
        quantity: 1,
        index: 0,
      },
    },
  },
  [BurgerTypes.WithTomato]: {
    width: 200,
    height: 200,
    imageSrc: tomatoBurgerImage,
    frameWidth: 100,
    recipe: {
      [Ingredients.Cutlet]: {
        quantity: 1,
        index: 1,
      },
      [Ingredients.Salad]: {
        quantity: 0,
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
  [BurgerTypes.WithSalad]: {
    width: 200,
    height: 200,
    imageSrc: saladBurgerImage,
    frameWidth: 100,
    recipe: {
      [Ingredients.Cutlet]: {
        quantity: 1,
        index: 1,
      },
      [Ingredients.Salad]: {
        quantity: 1,
        index: 2,
      },
      [Ingredients.Tomato]: {
        quantity: 0,
        index: 3,
      },
      [Ingredients.Bread]: {
        quantity: 1,
        index: 0,
      },
    },
  },
  [BurgerTypes.Total]: {
    width: 200,
    height: 200,
    imageSrc: totalBurgerImage,
    frameWidth: 100,
    recipe: {
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
