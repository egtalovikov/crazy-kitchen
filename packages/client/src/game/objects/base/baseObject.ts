import BaseZone from './baseZone'
import { TPoint } from '@/game/types/commonTypes'

// base object that have point and size like BaseZone but also is painted on game field
class BaseObject extends BaseZone {
  public image = new Image()

  constructor(imageSrc: string, width: number, height: number, point: TPoint) {
    super(width, height, point)
    this.image.src = imageSrc
  }
}

export default BaseObject
