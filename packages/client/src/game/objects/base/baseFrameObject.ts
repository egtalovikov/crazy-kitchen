import { TPoint } from '@/game/types/commonTypes'
import BaseObject from './baseObject'

// TODO: use this object for objects with animations
class BaseFrameObject extends BaseObject {
  public frameWidth: number

  public frameIndex = 0

  constructor(
    imageSrc: string,
    width: number,
    height: number,
    frameWidth: number,
    point: TPoint
  ) {
    super(imageSrc, width, height, point)
    this.frameWidth = frameWidth
  }
}

export default BaseFrameObject
