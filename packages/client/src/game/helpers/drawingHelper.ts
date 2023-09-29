import { store } from '@/store'
import Painter from '../core/painter'
import { GameState } from '../store/gameState'
import { draggingState } from './draggingHelper'
import { Drawable } from '../types/interfaces'

class DrawingHelper {
  public painter: Painter

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.painter = new Painter(contextDelegate)
  }

  public prepareFrame = () => {
    this.painter.clearCanvas()
  }

  public drawLevelState = (gameState: GameState) => {
    // TODO: calculate this depending on window size
    const textGap = 50
    let startY = 70
    const x = 50

    // TODO: move remaining time from redux to gameState object?
    const state = store.getState().game

    const timeText = `Время: ${gameState.remainingTime} сек.`
    this.painter.drawText(timeText, { x, y: startY }) // set coordinate
    const scoreText = `Собрано бургеров: ${state.score}`
    this.painter.drawText(scoreText, { x, y: (startY += textGap) })
  }

  public drawGameFrame = (gameState: GameState) => {
    this.prepareFrame()

    gameState.clients.forEach(client => {
      client.draw(this.painter)
    })

    gameState.cookingZones.forEach(zone => {
      zone.draw(this.painter)
    })

    // temp for testing, remove
    this.tempDrawIngredientZones(gameState)

    // TODO: is it ok to import dragging state here?
    // is it ok to cast like that?
    ;(draggingState.object as unknown as Drawable)?.draw(this.painter)

    this.drawLevelState(gameState)
  }

  // temp for testing, remove
  public tempDrawIngredientZones = (gameState: GameState) => {
    gameState.ingredientZones.forEach(zone => {
      this.painter.tempDrawZone(zone)
    })
  }
}

export default DrawingHelper
