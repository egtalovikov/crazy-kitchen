import { BurgerTypes, RecipeTypes } from '@gameTypes/recipe'
import Order from './order'
import { TPoint } from '@gameTypes/commonTypes'
import { burgerRecipes } from '@gameParams/recipeParams'

class BurgerOrder extends Order {
  constructor(type: BurgerTypes, point: TPoint) {
    const burgerParams = burgerRecipes[type]
    super(RecipeTypes.Burger, point, burgerParams)
    this.recipe = burgerParams.recipe
  }
}

export default BurgerOrder
