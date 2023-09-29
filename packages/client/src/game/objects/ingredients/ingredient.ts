import { Draggable } from '@/game/types/dragInterfaces'
import ingredientsParams from '../../parameters/ingredientParams'
import { ingredientZoneParams } from '../../parameters/zoneParameters'
import { IngredientState } from '../../store/ingredient'
import { TPoint } from '../../types/commonTypes'
import { Ingredients } from '../../types/ingredients'
import BaseFrameObject from '../base/baseFrameObject'
import Painter from '@/game/core/painter'
import gameState from '@/game/store/gameState'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Dish from '../dishes/dish'
import IngredientZone from '../zones/ingredientZone'
import { Drawable, Animatable } from '@/game/types/interfaces'

// Ingredient from ingredient zone, can be cooked, can be dragged and revert to its basePoint
// can be burnt
class Ingredient
  extends BaseFrameObject
  implements Drawable, Draggable, Animatable
{
  public type: Ingredients
  public basePoint: TPoint
  public preparationRequired: boolean // todo better name
  public state = new IngredientState()
  private interval = -1
  private isMoving = false

  constructor(type: Ingredients) {
    const params = ingredientsParams[type]
    super(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      params.startPoint
    )
    this.type = type
    this.basePoint = ingredientZoneParams[type].coordinates
    this.preparationRequired = params.preparationRequired
  }

  public getState = () => this.state as IngredientState

  /* private moving = () => {
    if (
      this.coordinates.x === this.basePoint.x &&
      this.coordinates.y === this.basePoint.y
    ) {
      clearInterval(this.interval)
    } else {
      const step = 7
      // TODO: all cases if x> base point
      if (this.coordinates.x < this.basePoint.x) {
        this.coordinates.x = Math.min(
          this.coordinates.x + step,
          this.basePoint.x
        )
      }
      if (this.coordinates.y < this.basePoint.y) {
        this.coordinates.y = Math.min(
          this.coordinates.y + step,
          this.basePoint.y
        )
      }
    }
  }*/

  public setIsInOrder = () => {
    this.getState().isInOrder = true
  }
  /* animation methods */

  public update(): void {
    console.log('update')
    if (this.isMoving) {
      if (this.coordinates.x + this.width <= 0) {
        this.isMoving = false
        // todo callback!
      } else {
        this.coordinates.x -= 2
      }
    }
  }

  /* drawing methods */

  public draw(painter: Painter): void {
    painter.drawObject(this)
  }

  /* drag&drop methods */

  public setCoordinates = (point: TPoint) => {
    this.coordinates = {
      x: point.x - this.width / 2,
      y: point.y - this.height / 2,
    }
  }
  public revertToSource(zone: IngredientZone, callback: () => void): void {
    // todo where to store zone coordinates?
    // this.interval = window.setInterval(this.moving, 100)
    // TODO: fly back to its zone and delete
    //this.coordinates = zone.coordinates
    //callback()
    this.isMoving = true
    console.log(zone)
    console.log(callback)
    //this.update()
  }

  public getTargets(): Dish[] {
    const dishes = gameState.cookingZones.map(zone => zone.getDish())
    return dishes
  }

  public intersects(dish: Dish): boolean {
    // temp solution to check intersection, is it ok?
    const zone = gameState.cookingZones.find(zone => zone.getDish() == dish)
    return CollisionHelper.objectsIntersect(this, zone!)
  }
}

export default Ingredient
