import { TPoint } from '../types/commonTypes'

class BaseState {
  public coordinates: TPoint

  constructor(coordinates: TPoint) {
    this.coordinates = coordinates
  }
}

export default BaseState

export class IngredientState extends BaseState {
  public isDragging = false
  public isOnBun = false

  constructor(coordinates: TPoint) {
    super(coordinates)
  }
}
