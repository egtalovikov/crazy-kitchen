import { store } from '@/store'
import Painter from '../core/painter'
import gameState from '../store/gameState'
import { Drawable } from '../types/dragInterfaces'
import { draggingState } from './draggingHelper'

// TODO: не должен знать о том что он рисует, сделать у всех метод draw и передавать им пейнтер
/* drawing logic, todo refactor to make multiple levels and differents types of orders */
class DrawingHelper {
  public painter: Painter

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.painter = new Painter(contextDelegate)
  }

  public prepareFrame = () => {
    this.painter.clearCanvas()
  }

  public drawLevelState = () => {
    // TODO: calculate this depending on window size
    const textGap = 50
    let startY = 70
    const x = 50

    // TODO: move it from store?
    const state = store.getState().game

    const timeText = `Время: ${state.remainingTime} сек.`
    this.painter.drawText(timeText, { x, y: startY }) // set coordinate
    const scoreText = `Собрано бургеров: ${state.score}`
    this.painter.drawText(scoreText, { x, y: (startY += textGap) })
  }

  public drawGameFrame = () => {
    this.prepareFrame()

    gameState.clients.forEach(client => {
      client.draw(this.painter)
    })

    gameState.cookingZones.forEach(zone => {
      zone.draw(this.painter)
    })

    // temp for testing, remove
    this.tempDrawIngredientZones()

    // TODO: что делать тут?
    //;(gameState.draggedObject as unknown as Drawable)?.draw(this.painter)
    ;(draggingState.object as unknown as Drawable)?.draw(this.painter)

    this.drawLevelState()
  }

  // temp for testing, remove
  public tempDrawIngredientZones = () => {
    gameState.ingredientZones.forEach(zone => {
      this.painter.tempDrawZone(zone)
    })
  }
}

export default DrawingHelper
