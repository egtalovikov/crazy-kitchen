import { TPoint } from '@/game/types/commonTypes'

// base object that have point and size but is not painted on game field

class BaseZone {
  public width: number
  public height: number
  public coordinates: TPoint

  constructor(width: number, height: number, point: TPoint) {
    this.width = width
    this.height = height
    this.coordinates = point
  }
}

export default BaseZone
