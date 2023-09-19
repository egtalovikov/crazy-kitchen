import recipeParameters from '../parameters/recipeParams'
import OrderState from '../store/order'
import { TPoint } from '../types/commonTypes'
import { Recipes, TRecipe } from '../types/recipe'
import BaseObject from './baseObject'

class Order extends BaseObject {
  public recipe: TRecipe
  public type: Recipes

  constructor(type: Recipes, point: TPoint) {
    const params = recipeParameters[type]
    const state = new OrderState(point)
    super(params.imageSrc, params.width, params.height, state)
    this.type = type
    this.recipe = params.recipe
  }
}

export default Order
