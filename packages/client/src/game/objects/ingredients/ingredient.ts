import ingredientsParams from '../../parameters/ingredientParams'
import { ingredientZoneParams } from '../../parameters/zoneParameters'
import { IngredientState } from '../../store/ingredient'
import { TPoint } from '../../types/commonTypes'
import { Ingredients } from '../../types/ingredients'
import BaseFrameObject from '../base/baseFrameObject'

// Ingredient from ingredient zone, can be cooked, can be dragged and revert to its basePoint
// can be burnt
class Ingredient extends BaseFrameObject {
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

  public setIsDragging = (isDragging: boolean) => {
    this.getState().isDragging = isDragging
  }

  public setCoordinates = (point: TPoint) => {
    this.coordinates = point
  }

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

  public moveBack = () => {
    this.interval = window.setInterval(this.moving, 100)
  }

  public setIsInOrder = () => {
    this.getState().isInOrder = true
  }
}

export default Ingredient
