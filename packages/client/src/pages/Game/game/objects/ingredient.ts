import ingredientsParams from '../parameters/objects'
import { IngredientState } from '../store/objectState'
import { Ingredients, TPoint } from '../types/commonTypes'
import BaseObject from './baseObject'

class Ingredient extends BaseObject {
  public type: Ingredients

  constructor(type: Ingredients) {
    const params = ingredientsParams[type]
    const state = new IngredientState(params.startPoint)
    super(params.imageSrc, params.size, params.size, state)
    this.type = type
  }

  public getState = () => this.state as IngredientState
  public setIsDragging = (isDragging: boolean) => {
    this.getState().isDragging = isDragging
  }
  public setCoordinates = (point: TPoint) => {
    this.getState().coordinates = point
  }
}

export default Ingredient
