import BaseObject from '../objects/base/baseObject'
import BaseSpriteObject from '../objects/base/baseSpriteObject'
import BaseZone from '../objects/base/baseZone'
import { TPoint } from '../types/commonTypes'

class Painter {
  constructor(private context: CanvasRenderingContext2D) {}

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

  public drawText = (text: string, point: TPoint) => {
    this.context.font = '400 24px Roboto Condensed' // todo can we store it at one place?
    this.context.fillStyle = '#fff'
    this.context.fillText(text, point.x, point.y)
  }

  // TODO: think what methods are actually needed
  public drawObject = (object: BaseObject) => {
    this.drawFrame(object)
  }

  public drawObjects = (objects: BaseObject[]) => {
    objects.forEach(object => this.drawFrame(object))
  }

  public clearCanvas = () => {
    const canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }

  // temp method to draw zone boundaries
  public tempDrawZone = (zone: BaseZone) => {
    this.context.strokeRect(
      zone.coordinates.x,
      zone.coordinates.y,
      zone.width,
      zone.height
    )
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
    // temp for testing
    this.context.strokeRect(
      object.coordinates.x,
      object.coordinates.y,
      object.width,
      object.height
    )
  }
}

export default Painter
