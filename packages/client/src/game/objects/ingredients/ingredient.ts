import { Draggable } from '@gameTypes/dragTypes'
import ingredientsParams from '@gameParams/ingredientParams'
import { ingredientZoneParams } from '@gameParams/zoneParameters'
import { TPoint } from '@gameTypes/commonTypes'
import { Ingredients } from '@gameTypes/ingredients'
import BaseFrameObject from '@gameObjects/base/baseFrameObject'
import Painter from '@game/core/painter'
import gameState from '@game/store/gameState'
import CollisionHelper from '@game/helpers/collisionHelper'
import Dish from '@gameObjects/dishes/dish'
import Trajectory from '@gameObjects/trajectory/trajectory'
import engine from '@game/core/engine'
import IngredientZone from '@gameObjects/zones/ingredientZone'

// Ingredient from ingredient zone, can be cooked, can be dragged and revert to its basePoint
// can be burnt
class Ingredient extends BaseFrameObject implements Draggable {
  public type: Ingredients

  public preparationRequired: boolean // todo better name

  /* revert to zone moving logic */
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
    this.preparationRequired = params.preparationRequired
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
  public revertToSource(source: IngredientZone, callback: () => void): void {
    // TODO: is it ok to use index?
    this.trajectory = new Trajectory(
      this.coordinates,
      source.coordinates,
      engine.getMainLoopIndex(),
      callback
    )
    // TODO: can we store same ref to coordinates?
    // this.coordinates = this.trajectory.current
  }

  public getTargets(): Dish[] {
    const dishes = gameState.cookingZones.map(zone => zone.getDish())
    return dishes
  }

  public intersects(dish: Dish): boolean {
    // TODO: temp solution to check intersection, is it ok?
    const zone = gameState.cookingZones.find(zone => zone.getDish() == dish)
    return CollisionHelper.objectsIntersect(this, zone!)
  }

  public update(time: number): void {
    /* trajectory is not null only if we need to move the ingredient */
    if (this.trajectory) {
      if (!this.trajectory.isPathEnded()) {
        // TODO: can we store same ref to coordinates?
        this.coordinates = this.trajectory.getCurrentPoint(time)
      } else {
        this.trajectory.movingEndFn()
      }
    }
  }
}

export default Ingredient
