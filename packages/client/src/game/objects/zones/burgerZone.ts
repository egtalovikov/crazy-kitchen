import { RecipeTypes } from '@/game/types/recipe'
import CookingZone from './cookingZone'
import Burger from '../dishes/burger'

class BurgerZone extends CookingZone {
  constructor() {
    super(RecipeTypes.Burger)
    this.dish = new Burger(this.coordinates)
  }

  public reset() {
    this.dish = new Burger(this.coordinates)
  }
}

export default BurgerZone
