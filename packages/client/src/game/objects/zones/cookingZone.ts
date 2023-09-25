import { Recipes, TRecipe } from '../../types/recipe'
import BaseZone from '../base/baseZone'
import { Ingredients } from '../../types/ingredients'
import recipeParameters from '../../parameters/recipeParams'
import zoneParams from '../../parameters/zoneParameters'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Ingredient from '../ingredients/ingredient'
import gameState from '@/game/store/gameState'
import Dish from '../orders/dish'
import BaseSpriteObject from '../base/baseSpriteObject'

// TODO: now is specific for burger, create universal cooking zone and its descendants
class CookingZone extends BaseZone {
  public recipe: TRecipe // TODO: is record the best solution?
  private dish: Dish

  constructor(type: Recipes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    this.recipe = recipeParameters[type].recipe
    this.dish = new Dish(type, this.coordinates)
  }

  private ingredientFits = (type: Ingredients): boolean => {
    // if not in recipe or already in the dish
    // TODO: is this the best way, may be recipe should not contain all ingredients?
    if (
      !this.recipe[type] ||
      this.dish.ingredients.some(i => i.type === type)
    ) {
      return false
    }
    // if empty we can put only bread

    if (this.dish.isEmpty() && type !== Ingredients.Bread) {
      return false // we can put only bread on empty zone
    }
    return true
  }

  public setHovered = (ingredient: Ingredient) => {
    const intersects = CollisionHelper.intersects(ingredient, this)

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
    console.log('dish clicked')
    // TODO: start dragging - set all drawable objects to draggedOrder
    if (!this.dish.isEmpty()) {
      gameState.draggedObject = this.dish
    }
  }

  public isEmpty = (): boolean => {
    return this.dish.isEmpty()
  }

  public getObjectToDraw = (): BaseSpriteObject[] => {
    return this.dish.getObjectsToDraw()
  }
}

export default CookingZone
