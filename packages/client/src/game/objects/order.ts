import recipeParameters from '../parameters/recipeParams'

import { TPoint } from '../types/commonTypes'
import { Recipes, TRecipe } from '../types/recipe'
import BaseObject from './base/baseObject'

class Order extends BaseObject {
  public recipe: TRecipe
  public type: Recipes

  constructor(type: Recipes, point: TPoint) {
    const params = recipeParameters[type]
    super(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      point
    )
    this.type = type
    this.recipe = params.recipe
  }
}

export default Order
