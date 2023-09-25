import recipeParameters from '../../parameters/recipeParams'
import { TPoint } from '../../types/commonTypes'
import { Recipes, TRecipe } from '../../types/recipe'
import BaseObject from '../base/baseObject'

class Order {
  public type: Recipes
  public recipe: TRecipe
  public image: BaseObject

  constructor(type: Recipes, point: TPoint) {
    const params = recipeParameters[type]
    this.type = type
    this.recipe = params.recipe
    this.image = new BaseObject(
      params.imageSrc,
      params.width,
      params.height,
      point
    )
  }
}

export default Order
