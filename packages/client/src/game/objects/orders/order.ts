import { TPoint } from '../../types/commonTypes'
import { RecipeTypes, TRecipe, TRecipeParameters } from '../../types/recipe'
import BaseObject from '../base/baseObject'

class Order extends BaseObject {
  public type: RecipeTypes
  public recipe: TRecipe

  constructor(type: RecipeTypes, point: TPoint, params: TRecipeParameters) {
    super(params.imageSrc, params.width, params.height, point)
    this.type = type
    this.recipe = params.recipe
  }
}

export default Order
