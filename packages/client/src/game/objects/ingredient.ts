import { ingredientsParams } from '../parameters/objectsParams'
import { IngredientState } from '../store/objectState'
import { Ingredients, TPoint } from '../types/commonTypes'
import BaseObject from './baseObject'

class Ingredient extends BaseObject {
  public type: Ingredients

  constructor(type: Ingredients) {
    const params = ingredientsParams[type]
    const state = new IngredientState(params.startPoint)
    super(params.imageSrc, params.width, params.height, state)
    this.type = type
  }

  public getState = () => this.state as IngredientState

  public setIsDragging = (isDragging: boolean) => {
    this.getState().isDragging = isDragging
  }

  public setCoordinates = (point: TPoint) => {
    this.getState().coordinates = point
  }

  public setIsOnBun = () => {
    this.getState().isOnBun = true
  }
}

export default Ingredient
