import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState, setRemainingTime } from '@store/modules/game/gameSlice'
import DrawingHelper from '../helpers/drawingHelper'
import DraggingHelper from '../helpers/draggingHelper'

class Engine {
  private levelInterval = -1

  private drawingHelper: DrawingHelper

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.drawingHelper = new DrawingHelper(contextDelegate)
  }

  private mainLoop = () => {
    // TODO: add client update logic for clients to go and order
    // add requestAnimationFrame
    const { remainingTime } = store.getState().game

    if (remainingTime <= 0) {
      this.pause()
      this.setGameOver()
      return
    }

    store.dispatch(setRemainingTime(remainingTime - 1))
    this.drawingHelper.drawGameFrame()
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
    window.clearInterval(this.levelInterval)
  }

  private continue = () => {
    this.levelInterval = window.setInterval(this.mainLoop, 1000) // 1000) temp for testing
  }

  private resetGame = () => {
    window.clearInterval(this.levelInterval)
    this.levelInterval = -1
    this.setGameState(GlobalGameState.Started)
    // this reset time, score
  }

  private startLevel = () => {
    this.setGameState(GlobalGameState.Started)
    this.drawingHelper.drawGameFrame()
    this.continue()
  }

  private setGameState = (state: GlobalGameState) => {
    store.dispatch(setGameState(state))
  }

  public startGame = () => {
    this.resetGame()
    this.startLevel()
  }

  /* drag&drop logic */

  public handleDruggingStart = (point: TPoint) =>
    DraggingHelper.dragStart(point)

  public handleDraggingMove = (point: TPoint) => {
    if (DraggingHelper.shouldDrag()) {
      DraggingHelper.drag(point)
      this.drawingHelper.drawGameFrame()
    }
  }

  public handleDraggingStop = () => {
    if (DraggingHelper.shouldDrag()) {
      DraggingHelper.dragStop()
      this.drawingHelper.drawGameFrame()
    }
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
