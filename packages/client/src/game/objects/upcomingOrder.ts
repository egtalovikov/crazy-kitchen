import recipeParameters from '../parameters/recipeParams'
import { TPoint } from '../types/commonTypes'
import { Ingredients } from '../types/ingredients'
import { Recipes, TRecipe, emptyOrder } from '../types/recipe'
import BaseObject from './base/baseObject'
import Ingredient from './ingredient'

class UpcomingOrder extends BaseObject {
  public isEmpty = true // will be draggable if false
  public recipe: TRecipe
  public ingredients: TRecipe
  public type: Recipes // compare when dragging to client
  public ingredientsToPaint: Ingredient[] = [] // TODO: bun top separate logic

  constructor(type: Recipes, point: TPoint) {
    const params = recipeParameters[type]
    super(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      point
    )
    this.ingredients = emptyOrder
    this.recipe = params.recipe
    this.type = type
  }

  public addIngredient = (type: Ingredients, coordinates: TPoint) => {
    // check if is in recipe
    // TODO: is this the best way, may be recipe should not contain all ingredients?
    if (!this.recipe[type]) {
      return
    }

    // check if not in order already
    if (this.ingredients[type] < this.recipe[type]) {
      this.ingredients[type] = 1
      this.isEmpty = false
      console.log('in upcoming order add ingredient')
      console.log(this.ingredients)
      const ingredientToPaint = new Ingredient(type)
      ingredientToPaint.setCoordinates(coordinates)
      this.ingredientsToPaint.push(ingredientToPaint)
    }
    // this.checkReadyState()
  }
}

export default UpcomingOrder
