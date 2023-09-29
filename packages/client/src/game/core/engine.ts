import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState } from '@store/modules/game/gameSlice'
import DrawingHelper from '../helpers/drawingHelper'
import DraggingHelper, { draggingState } from '../helpers/draggingHelper'
import gameState from '../store/gameState'
class Engine {
  private requestId = -1

  private startTime = 0

  private drawingHelper?: DrawingHelper

  private mainLoop = (now: number) => {
    this.drawingHelper?.drawGameFrame(gameState)

    this.updateObjects()

    this.decrementTime(now)

    this.checkRemainingTime()

    this.requestId = window.requestAnimationFrame(this.mainLoop)
  }

  private updateObjects = () => {
    // update clients, cooked ingredients and dragging object reverting state
    gameState.clients.forEach(client => {
      client.update()
    })

    draggingState.object?.update()
  }

  private decrementTime = (time: number) => {
    if (time - this.startTime >= 1000) {
      this.startTime = time
      gameState.remainingTime -= 1
    }
  }

  private checkRemainingTime = () => {
    const { remainingTime } = gameState
    if (remainingTime <= 0) {
      this.setGameOver()
      this.pause()
    }
  }

  public setDrawingHelper = (ctx: CanvasRenderingContext2D) => {
    this.drawingHelper = new DrawingHelper(ctx)
  }

  /* game state logic */

  private setGameOver = () => {
    const { game } = store.getState()
    const state =
      game.score === game.level.ordersCount
        ? GlobalGameState.Winned
        : GlobalGameState.Failed
    this.setGameState(state)
  }

  private pause = () => {
    window.cancelAnimationFrame(this.requestId)
  }

  private continue = () => {
    this.requestId = window.requestAnimationFrame(this.mainLoop)
  }

  private resetGame = () => {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = -1
    this.setGameState(GlobalGameState.Started)
    // this reset time, score
  }

  private startLevel = () => {
    this.setGameRestart()
    this.continue()
  }

  private setGameState = (state: GlobalGameState) => {
    store.dispatch(setGameState(state))
  }

  public startGame = () => {
    this.resetGame()
    this.startLevel()
  }

  public setGameRestart = () => {
    this.setGameState(GlobalGameState.Started)
    gameState.remainingTime = gameState.currentLevel.time
    this.requestId = -1
    this.startTime = 0
  }

  /* drag&drop logic */

  public handleDruggingStart = (point: TPoint) =>
    DraggingHelper.dragStart(point)

  public handleDraggingMove = (point: TPoint) =>
    DraggingHelper.shouldDrag() && DraggingHelper.drag(point)

  public handleDraggingStop = () =>
    DraggingHelper.shouldDrag() && DraggingHelper.dragStop()

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

export default new Engine()
