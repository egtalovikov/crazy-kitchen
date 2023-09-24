import { Ingredients } from '@/game/types/ingredients'
import ingredientsOnBurgerParams from '@/game/parameters/ingredientsOnBurgerParams'
import { TPoint } from '@/game/types/commonTypes'
import BaseSpriteObject from '../base/baseSpriteObject'

// Igredient that is in cooking zone, should be painted with indent
class DishIngredient extends BaseSpriteObject {
  public type: Ingredients
  public heightIndent: number
  constructor(type: Ingredients, point: TPoint, gap: number) {
    const params = ingredientsOnBurgerParams[type]
    super(params.imageSrc, params.width, params.height, point, params)
    this.type = type
    this.heightIndent = gap
  }
}

export default DishIngredient
