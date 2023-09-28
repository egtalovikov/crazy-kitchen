import BaseZone from '../base/baseZone'
import Ingredient from '../ingredients/ingredient'
import { Ingredients } from '@/game/types/ingredients'
import { ingredientZoneParams } from '@/game/parameters/zoneParameters'
import { DragSource, Draggable } from '@/game/types/dragInterfaces'

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
