import BaseObject from '../objects/baseObject'
import GameParameters from '../parameters/globalParams'

class Painter {
  private context: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.context = ctx
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
  }

  public clearCanvas = () => {
    this.context.clearRect(0, 0, GameParameters.WIDTH, GameParameters.HEIGHT)
  }
}

export default Painter
