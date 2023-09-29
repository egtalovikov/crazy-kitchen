import { Ingredients } from '@/game/types/ingredients'
import ingredientsOnBurgerParams from '@/game/parameters/ingredientsOnBurgerParams'
import { TPoint } from '@/game/types/commonTypes'
import BaseSpriteObject from '../base/baseSpriteObject'

class DishIngredient extends BaseSpriteObject {
  public type: Ingredients
  constructor(type: Ingredients, point: TPoint) {
    const params = ingredientsOnBurgerParams[type]
    super({ ...params, point: point })
    this.type = type
  }
}

export default DishIngredient
