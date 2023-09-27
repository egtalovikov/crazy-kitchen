import { Draggable, Drawable, Hoverable } from '@/game/types/dragInterfaces'
import ingredientsParams from '../../parameters/ingredientParams'
import { ingredientZoneParams } from '../../parameters/zoneParameters'
import { IngredientState } from '../../store/ingredient'
import { TPoint } from '../../types/commonTypes'
import { Ingredients } from '../../types/ingredients'
import BaseFrameObject from '../base/baseFrameObject'
import Painter from '@/game/core/painter'
import gameState from '@/game/store/gameState'
import CollisionHelper from '@/game/helpers/collisionHelper'
import BaseZone from '../base/baseZone'

// Ingredient from ingredient zone, can be cooked, can be dragged and revert to its basePoint
// can be burnt
class Ingredient extends BaseFrameObject implements Drawable, Draggable {
  public type: Ingredients
  public basePoint: TPoint
  public preparationRequired: boolean // todo better name
  public state = new IngredientState()
  private interval = -1

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

  private moving = () => {
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
  }

  public setIsInOrder = () => {
    this.getState().isInOrder = true
  }

  public draw(painter: Painter): void {
    painter.drawObject(this)
  }

  public setCoordinates = (point: TPoint) => {
    this.coordinates = {
      x: point.x - this.width / 2,
      y: point.y - this.height / 2,
    }
  }
  public revertToSource(): void {
    this.interval = window.setInterval(this.moving, 100)
    // TODO: полет назад на зону и исчезание ингредиента
  }

  public getTargets(): Hoverable[] {
    const dishes = gameState.cookingZones.map(zone => zone.getDish())
    return dishes
  }

  public intersects(target: Hoverable): boolean {
    return CollisionHelper.objectsIntersect(this, target as unknown as BaseZone)
  }
}

export default Ingredient
