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
import Trajectory from '../trajectory/trajectory'

// Ingredient from ingredient zone, can be cooked, can be dragged and revert to its basePoint
// can be burnt
class Ingredient extends BaseFrameObject implements Draggable {
  public type: Ingredients

  public preparationRequired: boolean // todo better name
  public state = new IngredientState()
  private basePoint: TPoint

  /* revert to zone logic */
  private isMoving = false
  private movingCallback: (() => void) | null = null
  private trajectory: Trajectory | null = null

  constructor(type: Ingredients) {
    const params = ingredientsParams[type]
    const zoneParams = ingredientZoneParams[type]
    super(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      zoneParams.coordinates
    )
    this.type = type
    this.basePoint = { ...zoneParams.coordinates }
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
  public revertToSource(callback: () => void): void {
    // TODO: fly back to its basePoint and delete in callback
    this.isMoving = true
    this.movingCallback = callback
    this.trajectory = new Trajectory(
      this.coordinates,
      this.basePoint,
      Date.now()
    )
    this.coordinates = this.trajectory.current
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

  public update(time: number): void {
    console.log('update')
    if (this.isMoving) {
      console.log('isMoving')
      // TODO: use basePoint to cacl moving direction
      //console.log(this.basePoint)

      if (this.coordinates.x + this.width <= 0) {
        this.isMoving = false
        // TODO: is it ok?
        if (this.movingCallback) {
          this.movingCallback()
          this.movingCallback = null
        }
      } else {
        console.log(this.coordinates)
        //this.coordinates.x -= 2
        if (this.trajectory) {
          this.coordinates = this.trajectory.getCurrentPoint(time)
        }
      }
    }
  }
}

export default Ingredient
