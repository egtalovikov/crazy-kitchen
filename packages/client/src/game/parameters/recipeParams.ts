import { Ingredients } from '../types/ingredients'
import { Recipes, TRecipeParameters } from '../types/recipe'
import totalBurgerImage from '@assets/ingredients/totalBurger.png'
// import test from '@assets/ingredients/test/test.png'

/* import plateImage from '@assets/plate.png'

import totalBurgerImage from '@assets/ingredients/totalBurger.png'
import { GameObjects } from '../types/enums'
import { TObjectParameter } from '../types/commonTypes'
import { TIngredientParameter } from '../types/ingredients'
// import burgerTomatoSaladImage from '@assets/ingredients/burgerTomatoSalad.png'
// import burgerCheeseSaladImage from '@assets/ingredients/burgerCheeseSalad.png'
// import backgroundImage from '@assets/startBackground.png'
// import backgroundImage from '@assets/mainBackground.png' */

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
