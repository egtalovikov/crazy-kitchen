import { store } from '@/store'
import Painter from '../core/painter'
import gameState from '../store/gameState'

/* drawing logic, todo refactor to make multiple levels and differents types of orders */
class DrawingHelper {
  public painter: Painter

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.painter = new Painter(contextDelegate)
  }

  public prepareFrame = () => {
    this.painter.clearCanvas()
  }

  public drawClients = () => {
    gameState.clients.forEach(client => {
      this.painter.drawObject(client)
      client.orders.forEach(order => this.painter.drawObject(order.image))
    })
  }

  public drawCookingZones = () => {
    gameState.cookingZones.forEach(zone => {
      this.painter.drawZone(zone) // temp for testing, remove
      if (!zone.isEmpty) {
        this.painter.drawObject(zone.plate)
        zone.dish.forEach(ingredient => {
          this.painter.tempDrawFrame(ingredient)
        })
        this.painter.tempDrawFrame(zone.topBun)
      }
    })
  }

  // temp for testing, remove
  public drawIngredientZones = () => {
    gameState.ingredientZones.forEach(zone => {
      this.painter.drawZone(zone)
    })
  }

  public drawDraggedObjects = () => {
    this.painter.drawObjects(gameState.draggedObjects)
  }

  public drawLevelState = () => {
    // TODO: can we calculate this?
    const textGap = 50
    let startY = 70
    const x = 50
    const state = store.getState().game

    const timeText = `Время: ${state.remainingTime} сек.`
    this.painter.drawText(timeText, { x, y: startY }) // set coordinate
    const scoreText = `Собрано бургеров: ${state.score}`
    this.painter.drawText(scoreText, { x, y: (startY += textGap) })
  }

  public drawGameFrame = () => {
    this.prepareFrame()

    this.drawClients()

    this.drawCookingZones()

    // temp for testing, remove
    this.drawIngredientZones()

    this.drawDraggedObjects()

    this.drawLevelState()
  }
}

export default DrawingHelper
