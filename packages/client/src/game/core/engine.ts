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

  // TODO: what to do if game paused, should we store now somewhere?
  private mainLoop = (now: number) => {
    this.drawingHelper?.drawGameFrame(gameState)

    this.updateObjects(now)

    this.decrementTime(now)

    this.checkRemainingTime()

    this.requestId = window.requestAnimationFrame(this.mainLoop)
  }

  private updateObjects = (time: number) => {
    // update clients, cooked ingredients and dragging object reverting state
    gameState.clients.forEach(client => {
      client.update()
    })
    console.log('updateObjects')
    draggingState.object?.update(time)
    draggingState.revertedObjects.forEach(object => object.update(time))
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

  private pause = () => {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = -1
  }

  private continue = () => {
    console.log('continue')
    // fix for double calls, should we handle it differently?
    if (this.requestId === -1) {
      console.log('continue2')
      this.requestId = window.requestAnimationFrame(this.mainLoop)
    }
  }

  private resetGame = () => {
    window.cancelAnimationFrame(this.requestId)
    this.requestId = -1
    this.startTime = 0
    gameState.remainingTime = gameState.currentLevel.time
  }

  private setGameState = (state: GlobalGameState) => {
    store.dispatch(setGameState(state))
  }

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
    console.log('startGame')
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
