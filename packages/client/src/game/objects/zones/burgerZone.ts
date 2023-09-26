import CookingZone from './cookingZone'
import { Recipes } from '@/game/types/recipe'
import { Ingredients } from '@/game/types/ingredients'

class BurgerZone extends CookingZone {
  constructor() {
    super(Recipes.Burger)
  }

  public ingredientFits(type: Ingredients) {
    const parentFitsValue = super.ingredientFits(type)
    return (
      parentFitsValue && !(this.dish.isEmpty() && type !== Ingredients.Bread)
    )
  }
}

export default BurgerZone
