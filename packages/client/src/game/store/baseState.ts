import { TPoint } from '../types/commonTypes'

class BaseState {
  public coordinates: TPoint

  constructor(coordinates: TPoint) {
    this.coordinates = coordinates
  }
}

export default BaseState
