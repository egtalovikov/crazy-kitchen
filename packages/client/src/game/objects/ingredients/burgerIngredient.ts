import { TPoint } from '@/game/types/commonTypes'
import { Ingredients } from '@/game/types/ingredients'
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
}

export default BurgerIngredient
