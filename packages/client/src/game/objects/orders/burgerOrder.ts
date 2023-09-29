import { BurgerTypes, RecipeTypes } from '@/game/types/recipe'
import Order from './order'
import { TPoint } from '@/game/types/commonTypes'
import { burgerRecipes } from '@/game/parameters/recipeParams'

class BurgerOrder extends Order {
  constructor(type: BurgerTypes, point: TPoint) {
    const burgerParams = burgerRecipes[type]
    super(RecipeTypes.Burger, point, burgerParams)
    this.recipe = burgerParams.recipe
  }
}

export default BurgerOrder
