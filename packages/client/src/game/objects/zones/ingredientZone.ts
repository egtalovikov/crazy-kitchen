import BaseZone from '@gameObjects/base/baseZone'
import Ingredient from '@gameObjects/ingredients/ingredient'
import { Ingredients } from '@gameTypes/ingredients'
import { ingredientZoneParams } from '@gameParams/zoneParameters'
import { DragSource, Draggable } from '@gameTypes/dragTypes'

class IngredientZone extends BaseZone implements DragSource {
  private type: Ingredients

  constructor(type: Ingredients) {
    const params = ingredientZoneParams[type]
    super(params.width, params.height, params.coordinates)
    this.type = type
  }

  public getDraggable(): Draggable {
    return new Ingredient(this.type)
  }

  public reset() {
    // TODO: что делать если он тут не нужен а в интерфейсе есть?

    console.log('in ingredient zone reset')
  }
}

export default IngredientZone
