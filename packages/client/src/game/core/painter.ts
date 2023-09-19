import BaseObject from '../objects/baseObject'
import { TPoint } from '../types/commonTypes'

class Painter {
  constructor(private _contextDelegate: () => CanvasRenderingContext2D) {}

  get context() {
    return this._contextDelegate()
  }

  private drawFrame = (object: BaseObject) => {
    const { coordinates } = object.state
    this.context.drawImage(
      object.image,
      coordinates.x,
      coordinates.y,
      object.width,
      object.height
    )
    // temp for collision counting
    this.context.strokeRect(
      coordinates.x,
      coordinates.y,
      object.width,
      object.height
    )
  }

  public drawText = (text: string, point: TPoint) => {
    this.context.font = '400 24px Roboto Condensed' // todo can we store it at one place?
    this.context.fillStyle = '#fff'
    this.context.fillText(text, point.x, point.y)
  }

  // todo build error fix
  /* public drawRect = (point: TPoint, width: number, height: number) => {
    this.context.fillStyle = '#5bc7f2'
    this.context.beginPath()
    this.context.roundRect(point.x, point.y, width, height, 5)
    this.context.fill()
  } */

  public drawObjects = (objects: BaseObject[]) => {
    objects.forEach(object => this.drawFrame(object))
  }

  public clearCanvas = () => {
    const canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }
}

export default Painter
