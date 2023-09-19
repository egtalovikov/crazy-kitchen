import { TPoint } from '../types/commonTypes'
import BaseState from './baseState'

export class IngredientState extends BaseState {
  public isDragging = false
  public isInOrder = false
  public isFlyingBack = false

  constructor(coordinates: TPoint) {
    super(coordinates)
  }

  public updateBackState = () => {
    this.coordinates.x += 1
    this.coordinates.y += 1
  }
}
