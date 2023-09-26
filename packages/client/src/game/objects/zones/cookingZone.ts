import { Recipes, TRecipe } from '../../types/recipe'
import BaseZone from '../base/baseZone'
import { Ingredients } from '../../types/ingredients'
import recipeParameters from '../../parameters/recipeParams'
import zoneParams from '../../parameters/zoneParameters'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Ingredient from '../ingredients/ingredient'
import gameState from '@/game/store/gameState'
import Dish from '../orders/dish'

class CookingZone extends BaseZone {
  public recipe: TRecipe // TODO: is record the best solution?
  protected dish: Dish
  private type: Recipes

  constructor(type: Recipes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    this.recipe = recipeParameters[type].recipe
    this.dish = new Dish(type, this.coordinates)
    this.type = type
  }

  // TODO: may be recipe should not contain all ingredients?
  protected ingredientFits(type: Ingredients) {
    return (
      !!this.recipe[type] && !this.dish.ingredients.some(i => i.type === type)
    )
  }

  public setHovered = (ingredient: Ingredient) => {
    const intersects = CollisionHelper.objectsIntersect(ingredient, this)

    if (
      intersects &&
      this.ingredientFits(ingredient.type) &&
      !this.dish.getIsHovered()
    ) {
      this.dish.setIsHovered(true)
    } else if (this.dish.getIsHovered() && !intersects) {
      this.dish.setIsHovered(false)
    }
  }

  public addIngredient = (type: Ingredients) => {
    if (this.ingredientFits(type)) {
      this.dish.addIngredient(type)
    }
    // remove hover
    if (this.dish.getIsHovered()) {
      this.dish.setIsHovered(false)
    }
  }

  public isClicked = () => {
    if (!this.dish.isEmpty()) {
      gameState.draggedObject = this.dish
    }
  }

  public isEmpty = (): boolean => this.dish.isEmpty()

  public getObjectToDraw = () => this.dish.getObjectsToDraw()

  public resetDish = () => {
    this.dish = new Dish(this.type, this.coordinates)
  }
}

export default CookingZone
