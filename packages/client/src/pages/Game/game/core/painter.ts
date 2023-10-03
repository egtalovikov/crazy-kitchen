import BaseObject from '../objects/baseObject'
import { TPoint } from '../types/commonTypes'

class Painter {
  private context: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.context = ctx
  }

  private drawText = (text: string, point: TPoint) => {
    this.context.font = 'bold 48px serif'
    this.context.fillStyle = '#fff'
    this.context.fillText(text, point.x, point.y)
  }

  public drawFrame = (object: BaseObject) => {
    const { coordinates } = object.state
    this.context.drawImage(
      object.image,
      coordinates.x,
      coordinates.y,
      object.width,
      object.height
    )
    // temp for collision counting
    /*this.context.strokeRect(
      coordinates.x,
      coordinates.y,
      object.width,
      object.height
    )*/
  }

  public drawTime = (text: string) => {
    // todo move to params
    this.drawText(text, { x: 50, y: 50 })
  }

  public drawScore = (text: string) => {
    this.drawText(text, { x: 50, y: 100 })
  }

  public clearCanvas = () => {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.clientWidth,
      this.context.canvas.clientHeight
    )
  }
}

export default Painter
