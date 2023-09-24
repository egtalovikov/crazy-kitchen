import { TPoint } from '@/game/types/commonTypes'
import BaseObject from './baseObject'

class BaseSpriteObject extends BaseObject {
  public spriteX: number

  public spriteY: number

  public sWidth: number

  public sHeight: number

  constructor(
    imageSrc: string,
    width: number,
    height: number,
    point: TPoint,
    params: any
  ) {
    // todo any
    super(imageSrc, width, height, point)
    this.spriteX = params.spriteX
    this.spriteY = params.spriteY
    this.sWidth = params.spriteWidth
    this.sHeight = params.spriteHeight
  }
}
export default BaseSpriteObject
