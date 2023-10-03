import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState } from '@store/modules/game/gameSlice'
import DrawingHelper from '../helpers/drawingHelper'
import DraggingHelper, { draggingState } from '../helpers/draggingHelper'
import gameState from '../store/gameState'
class Engine {
  private requestId = -1

  private drawingHelper?: DrawingHelper

  private mainLoopIndex = 0

  // TODO: what to do if game paused, should we store now somewhere?
  private mainLoop = () => {
    this.mainLoopIndex++

    this.drawingHelper?.drawGameFrame(gameState)

    this.updateObjects()

    this.decrementTime()

    this.checkRemainingTime()

    this.requestId = window.requestAnimationFrame(this.mainLoop)
  }

  public getMainLoopIndex = () => this.mainLoopIndex

  private updateObjects = () => {
    // TODO: update cooked ingredients
    gameState.clients.forEach(client => {
      client.update()
    })

    draggingState.revertedObjects.forEach(object =>
      object.update(this.mainLoopIndex)
    )
  }

  private decrementTime = () => {
    gameState.remainingTime -= 1
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

  private pause = () => window.cancelAnimationFrame(this.requestId)

  private continue = () =>
    (this.requestId = window.requestAnimationFrame(this.mainLoop))

  private resetGame = () => {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = -1
    gameState.remainingTime = gameState.currentLevel.time
  }

  private setGameState = (state: GlobalGameState) =>
    store.dispatch(setGameState(state))

  private setGameOver = () => {
    const state =
      gameState.score === gameState.currentLevel.ordersCount
        ? GlobalGameState.Winned
        : GlobalGameState.Failed
    this.setGameState(state)
    this.resetGame()
  }

  public startGame = () => {
    if (!this.drawingHelper) {
      throw Error('no drawing helper is set')
    }
    this.resetGame()
    this.setGameState(GlobalGameState.Started)
    this.continue()
  }

  public restartGame = () => this.setGameState(GlobalGameState.Started)

  /* drag&drop logic */

  public handleDruggingStart = (point: TPoint) =>
    DraggingHelper.dragStart(point)

  public handleDraggingMove = (point: TPoint) =>
    DraggingHelper.shouldDrag() && DraggingHelper.drag(point)

  public handleDraggingStop = () =>
    DraggingHelper.shouldDrag() && DraggingHelper.dragStop()

  /* game over state methods */

  public isGameOver = () => {
    const { globalGameState: state } = store.getState().game
    return state == GlobalGameState.Failed || state == GlobalGameState.Winned
  }

  public isGameWinned = () =>
    store.getState().game.globalGameState == GlobalGameState.Winned
}

export default new Engine()
