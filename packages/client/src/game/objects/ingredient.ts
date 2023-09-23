import ingredientsParams from '../parameters/ingredientParams'
import { IngredientState } from '../store/ingredient'
import { TPoint } from '../types/commonTypes'
import { Ingredients } from '../types/ingredients'
import BaseObject from './base/baseObject'

class Ingredient extends BaseObject {
  public type: Ingredients
  public basePoint: TPoint
  public preparationRequired: boolean // todo better name
  public state = new IngredientState()

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
    this.basePoint = params.startPoint
    this.preparationRequired = params.preparationRequired
  }

  public getState = () => this.state as IngredientState

  public setIsDragging = (isDragging: boolean) => {
    this.getState().isDragging = isDragging
  }

  public setCoordinates = (point: TPoint) => {
    this.coordinates = point
  }

  public setIsInOrder = () => {
    this.getState().isInOrder = true
  }
}

export default Ingredient
