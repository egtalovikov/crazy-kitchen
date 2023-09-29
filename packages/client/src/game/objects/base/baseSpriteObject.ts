import { BaseSpriteObjectParamsWithPoint } from '@/game/types/commonTypes'
import BaseObject from './baseObject'

class BaseSpriteObject extends BaseObject {
  public spriteX: number

  public spriteY: number

  public sWidth: number

  public sHeight: number

  constructor(params: BaseSpriteObjectParamsWithPoint) {
    super(params.imageSrc, params.width, params.height, params.point)
    this.spriteX = params.spriteX
    this.spriteY = params.spriteY
    this.sWidth = params.sWidth
    this.sHeight = params.sHeight
  }
}
export default BaseSpriteObject
