import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState } from '@store/modules/game/gameSlice'
import DrawingHelper from '../helpers/drawingHelper'
import DraggingHelper, { draggingState } from '../helpers/draggingHelper'
import gameState from '../store/gameState'
import { Animatable } from '@/game/types/interfaces'
class Engine {
  private requestId = -1
  private startTime = 0

  private drawingHelper: DrawingHelper

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.drawingHelper = new DrawingHelper(contextDelegate)
  }

  private mainLoop = (now: number) => {
    this.drawingHelper.drawGameFrame(gameState)

    // update clients and dragging object reverting state
    this.updateObjects()

    this.decrementTime(now)

    this.checkRemainingTime()

    this.requestId = window.requestAnimationFrame(this.mainLoop)
  }

  private updateObjects = () => {
    gameState.clients.forEach(client => {
      client.update()
    })

    if (draggingState.object) {
      // TODO: inherit Draggable from Animatable?
      // or add update method to draggable?
      ;(draggingState.object as unknown as Animatable).update()
    }
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
    this.setGameState(GlobalGameState.Started)
    //this.drawingHelper.drawGameFrame(gameState)
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
      //this.drawingHelper.drawGameFrame(gameState)
    }
  }

  public handleDraggingStop = () => {
    if (DraggingHelper.shouldDrag()) {
      DraggingHelper.dragStop()
      //this.drawingHelper.drawGameFrame(gameState)
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
