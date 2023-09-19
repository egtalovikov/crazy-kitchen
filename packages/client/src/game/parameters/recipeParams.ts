import { Ingredients } from '../types/ingredients'
import { Recipes, TRecipeParameters } from '../types/recipe'
import totalBurgerImage from '@assets/ingredients/totalBurger.png'

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
    imageSrc: totalBurgerImage,
    recipe: {
      [Ingredients.Cheese]: 1,
      [Ingredients.Cutlet]: 1,
      [Ingredients.Salad]: 1,
      [Ingredients.Tomato]: 1,
      [Ingredients.Bread]: 1,
    },
  },
}

export default recipeParameters
