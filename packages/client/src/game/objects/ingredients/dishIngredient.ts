import { Ingredients } from '@gameTypes/ingredients'
import ingredientsOnBurgerParams from '@gameParams/ingredientsOnBurgerParams'
import { TPoint } from '@gameTypes/commonTypes'
import BaseSpriteObject from '../base/baseSpriteObject'

class DishIngredient extends BaseSpriteObject {
  public type: Ingredients

  constructor(type: Ingredients, point: TPoint) {
    const params = ingredientsOnBurgerParams[type]
    super({ ...params, point: point })
    this.type = type
  }

  public setCoordinates(point: TPoint) {
    this.coordinates = { ...point }
  }
}

export default DishIngredient
