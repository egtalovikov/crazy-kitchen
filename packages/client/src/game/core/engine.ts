import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState, setRemainingTime } from '@store/modules/game/gameSlice'
import CollisionHelper from '../helpers/collisionHelper'
import DrawStateHelper from '../helpers/drawStateHelper'

class Engine {
  private levelInterval = -1

  private painter: Painter

  private contextDelegate: () => CanvasRenderingContext2D

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.painter = new Painter(contextDelegate)
    this.contextDelegate = contextDelegate
  }

  get context() {
    return this.contextDelegate()
  }

  /* drawing logic, todo refactor to make multiple levels and differents types of orders */

  public drawGame = () => {
    this.painter.clearCanvas()

    this.painter.drawObjects(gameState.clients)
    // todo every client order position should be calculated
    this.painter.drawObjects(gameState.clients[0].orders)

    // TODO: create several zones later
    this.painter.drawObjects(gameState.cookingZone.getObjectsToDraw())

    this.painter.drawObjects(gameState.ingredients)

    DrawStateHelper.drawLevelState(this.painter, store.getState().game)
  }

  /* drag&drop logic */

  public setIsDragging = (point: TPoint, ingredient: Ingredient) => {
    if (CollisionHelper.checkIfPointInZone(point, ingredient)) {
      ingredient.setIsDragging(true)
    }
  }

  private placeIngredient = () => {
    gameState.ingredients.forEach(ingredient => {
      if (ingredient.getState().isDragging) {
        ingredient.setIsDragging(false)
      }

      const { cookingZone: cZone } = gameState

      // todo iterate all cooking zones and detect zone
      if (CollisionHelper.checkCollision(ingredient, cZone.plate)) {
        // TODO: decide will we use cZone coords or plate coords?
        cZone.upcomingOrder.addIngredient(
          ingredient.type,
          cZone.plate.coordinates
        )

        // todo set new cooking zone view here

        // no animation, ingredient is painted here
        ingredient.setCoordinates(ingredient.basePoint)
      } else {
        // todo ingredient will move back to its place, need animation here
        ingredient.setCoordinates(ingredient.basePoint)
      }
    })
  }

  public handleDruggingStart = (point: TPoint) => {
    gameState.ingredients.forEach(i => this.setIsDragging(point, i))
  }

  public handleDraggingMove = (point: TPoint) => {
    const isDragging = gameState.ingredients.some(i => i.getState().isDragging)
    if (isDragging) {
      gameState.ingredients.forEach(i => {
        if (i.getState().isDragging) {
          // todo replate 20 amgic number with % of object width
          i.setCoordinates({ x: point.x - 20, y: point.y - 20 })
        }
      })
      this.drawGame()
    }
  }

  public handleDraggingStop = () => {
    this.placeIngredient()
    this.drawGame()
  }

  /* game state logic */

  private setGameState = (state: GlobalGameState) => {
    store.dispatch(setGameState(state))
  }

  private setGameOver = () => {
    const { game } = store.getState()
    const state =
      game.score === game.level.ordersCount
        ? GlobalGameState.Winned
        : GlobalGameState.Failed
    this.setGameState(state)
  }

  private pause = () => {
    window.clearInterval(this.levelInterval)
  }

  private continue = () => {
    this.levelInterval = window.setInterval(this.mainLoop, 1000)
  }

  private mainLoop = () => {
    // TODO: add client update logic for clients to go and order
    const { remainingTime } = store.getState().game

    if (remainingTime <= 0) {
      this.pause()
      this.setGameOver()
      return
    }

    store.dispatch(setRemainingTime(remainingTime - 1))
    this.drawGame()
  }

  private resetGame = () => {
    window.clearInterval(this.levelInterval)
    this.levelInterval = -1
    this.setGameState(GlobalGameState.Started)
    // this reset time
  }

  private startLevel = () => {
    this.setGameState(GlobalGameState.Started)
    this.drawGame()
    this.continue()
  }

  public startGame = () => {
    console.log('in start game')
    this.resetGame()
    this.startLevel()
  }

  /* game over methods */

  public isGameOver = () => {
    const { gameState } = store.getState().game
    return (
      gameState == GlobalGameState.Failed || gameState == GlobalGameState.Winned
    )
  }

  public isGameWinned = () =>
    store.getState().game.gameState == GlobalGameState.Winned
}

export default Engine
