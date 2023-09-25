import gameState from '@/game/store/gameState'
import BaseZone from '../base/baseZone'
import Ingredient from '../ingredients/ingredient'
import { Ingredients } from '@/game/types/ingredients'
import { ingredientZoneParams } from '@/game/parameters/zoneParameters'

class IngredientZone extends BaseZone {
  private type: Ingredients

  constructor(type: Ingredients) {
    const params = ingredientZoneParams[type]
    super(params.width, params.height, params.coordinates)
    this.type = type
  }

  public isClicked = () => {
    const ingredient = new Ingredient(this.type)
    ingredient.coordinates = this.coordinates
    ingredient.setIsDragging(true)
    gameState.draggedObject = ingredient
  }
}

export default IngredientZone
