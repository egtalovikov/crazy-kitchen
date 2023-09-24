import BaseObject from '../objects/base/baseObject'
import BaseSpriteObject from '../objects/base/baseSpriteObject'
import BaseZone from '../objects/base/baseZone'
import { TPoint } from '../types/commonTypes'

class Painter {
  constructor(private _contextDelegate: () => CanvasRenderingContext2D) {}

  get context() {
    return this._contextDelegate()
  }

  private drawFrame = (object: BaseObject) => {
    this.context.drawImage(
      object.image,
      object.coordinates.x,
      object.coordinates.y,
      object.width,
      object.height
    )
    // temp for collision counting
    this.context.strokeRect(
      object.coordinates.x,
      object.coordinates.y,
      object.width,
      object.height
    )
  }

  // temp method to draw zone boundaries
  public drawZone = (zone: BaseZone) => {
    this.context.strokeRect(
      zone.coordinates.x,
      zone.coordinates.y,
      zone.width,
      zone.height
    )
  }

  public drawText = (text: string, point: TPoint) => {
    this.context.font = '400 24px Roboto Condensed' // todo can we store it at one place?
    this.context.fillStyle = '#fff'
    this.context.fillText(text, point.x, point.y)
  }

  public drawObjects = (objects: BaseObject[]) => {
    objects.forEach(object => this.drawFrame(object))
  }

  public clearCanvas = () => {
    const canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }

  // temp, think if we need spriteX and spriteY for base object?
  public tempDrawFrame = (object: BaseSpriteObject) => {
    this.context.drawImage(
      object.image,
      object.spriteX,
      object.spriteY,
      object.sWidth,
      object.sHeight,
      object.coordinates.x,
      object.coordinates.y,
      object.width,
      object.height
    )
    // temp for collision counting
    /* this.context.strokeRect(
      object.coordinates.x,
      object.coordinates.y,
      object.width,
      object.height
    ) */
  }

  // todo build error fix
  /* public drawRect = (point: TPoint, width: number, height: number) => {
    this.context.fillStyle = '#5bc7f2'
    this.context.beginPath()
    this.context.roundRect(point.x, point.y, width, height, 5)
    this.context.fill()
  } */
}

export default Painter
