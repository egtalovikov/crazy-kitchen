import BaseObject from '../objects/baseObject'
import { TPoint } from '../types/commonTypes'

class Painter {
  constructor(private _contextDelegate: () => CanvasRenderingContext2D) {}

  // getter to access context (to reduce amount of changes in present code)
  get context() {
    return this._contextDelegate()
  }

  private drawText = (text: string, point: TPoint) => {
    this.context.font = 'bold 48px serif'
    this.context.fillStyle = '#fff'
    this.context.fillText(text, point.x, point.y)
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

  public drawMultipleObjects = (objects: BaseObject[]) => {
    objects.forEach(object => this.drawFrame(object))
  }

  public drawTime = (text: string) => {
    this.drawText(text, { x: 50, y: 50 }) // todo move to params
  }

  public drawScore = (text: string) => {
    this.drawText(text, { x: 50, y: 100 })
  }

  public clearCanvas = () => {
    const canvas = this.context.canvas
    this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }
}

export default Painter
