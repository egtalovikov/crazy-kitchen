import { TPoint } from '@gameTypes/commonTypes'
import { Ingredients } from '@gameTypes/ingredients'
import DishIngredient from './dishIngredient'

class BurgerIngredient extends DishIngredient {
  public heightIndent: number

  constructor(type: Ingredients, point: TPoint, gap: number) {
    super(type, point)
    this.heightIndent = gap
  }

  public setIndent = (indent: number) => {
    this.heightIndent = indent
  }

  // TODO: is it ok to derive method like this (widthIndent?)?
  public setCoordinates(point: TPoint, widthIndent?: number) {
    this.coordinates = {
      x: point.x + (widthIndent || 0),
      y: point.y + this.heightIndent,
    }
  }
}

export default BurgerIngredient
