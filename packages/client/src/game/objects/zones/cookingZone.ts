import { RecipeTypes } from '../../types/recipe'
import BaseZone from '../base/baseZone'
import zoneParams from '../../parameters/zoneParameters'
import Dish from '../dishes/dish'
import { DragSource, Drawable } from '@/game/types/dragInterfaces'
import Painter from '@/game/core/painter'
class CookingZone extends BaseZone implements Drawable, DragSource {
  protected dish: Dish
  private type: RecipeTypes

  constructor(type: RecipeTypes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    this.dish = new Dish(type, this.coordinates)
    this.type = type
  }

  public isEmpty = (): boolean => this.dish.isEmpty()

  public resetDish = () => {
    this.dish = new Dish(this.type, this.coordinates)
  }

  public draw(painter: Painter): void {
    painter.tempDrawZone(this) // temp for testing, remove
    if (!this.isEmpty()) {
      this.dish
        .getObjectsToDraw()
        .forEach(object => painter.tempDrawFrame(object))
    }
  }

  public getDish = (): Dish => this.dish

  public getDraggable(): Dish | null {
    return !this.dish.isEmpty() ? this.dish : null
  }

  public reset() {
    this.dish = new Dish(this.type, this.coordinates)
  }
}

export default CookingZone
