import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import { GameLevelList, GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import {
  setGameState,
  setRemainingTime,
  setScore,
} from '@store/modules/game/gameSlice'
import CollisionHelper from '../helpers/collisionHelper'
import GameLevels from '../parameters/levelParams'

class Engine {
  private levelInterval = -1

  private painter: Painter

  private contextDelegate: () => CanvasRenderingContext2D

  private currentLevel = GameLevels[GameLevelList.Level1]

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.painter = new Painter(contextDelegate)
    this.contextDelegate = contextDelegate
  }

  get context() {
    return this.contextDelegate()
  }
  private drawImmovableObjects = () => {
    this.painter.clearCanvas()
    this.painter.drawMultipleObjects([
      gameState.bread,
      gameState.person,
      gameState.order,
    ])
  }

  private drawIngredients = () => {
    this.painter.drawMultipleObjects(gameState.ingredients)
  }

  private drawLevelState = () => {
    const { game: state } = store.getState()
    const timeText = `Время: ${state.remainingTime} сек.`
    this.painter.drawTime(timeText)
    const scoreText = `Собрано бургеров: ${state.score}`
    this.painter.drawScore(scoreText)
  }

  public drawGame = () => {
    this.drawImmovableObjects()
    this.drawIngredients()
    this.drawLevelState()
  }

  /* drag&drop logic */

  public ingredientClicked = (point: TPoint, ingredient: Ingredient) => {
    if (CollisionHelper.checkIfPointIsOnObject(point, ingredient)) {
      ingredient.setIsDragging(true)
    }
  }

  public checkDragging = (point: TPoint) => {
    gameState.ingredients.forEach(i => this.ingredientClicked(point, i))
  }

  public handleDragging = (point: TPoint) => {
    const isDragging = gameState.ingredients.some(i => i.getState().isDragging)
    if (isDragging) {
      gameState.ingredients.forEach(i => {
        if (i.getState().isDragging) {
          i.setCoordinates({ x: point.x - 20, y: point.y - 20 }) // todo setCoordinates will remove % of width
        }
      })
      this.drawGame()
    }
  }

  private setIsOnBun = () => {
    gameState.ingredients.forEach(ingredient => {
      if (ingredient.getState().isDragging) {
        ingredient.setIsDragging(false)
      }
      if (CollisionHelper.checkCollision(ingredient, gameState.bread)) {
        ingredient.setIsOnBun()
        ingredient.setCoordinates(
          CollisionHelper.calculateOverlapCenter(gameState.bread, ingredient)
        )
      }
    })
  }

  public draggingStopped = () => {
    this.setIsOnBun()
    this.setBurgerFinished()
    this.drawGame()
  }

  /* drag&drop logic end */

  private setBurgerFinished = () => {
    // temp check if every ingredient is on bun, later compare with current order (from level params)
    const burgerFinished = gameState.ingredients.every(
      i => i.getState().isOnBun
    )

    console.log('is burder finished')
    console.log(burgerFinished)

    if (burgerFinished) {
      const newScore = store.getState().game.score + 1
      // todo make more complicated logic to calc score
      store.dispatch(setScore(newScore))
      gameState.resetIngredients()
      if (newScore === this.currentLevel.ordersCount) {
        this.setGameState(GlobalGameState.Winned)
      }
    }
  }

  /* game state logic */

  private setGameOver = () => {
    const gameState = store.getState().game
    console.log('set complete state')
    if (gameState.score === gameState.level.ordersCount) {
      this.setGameState(GlobalGameState.Winned)
    } else {
      this.setGameState(GlobalGameState.Failed)
    }
  }

  private setGameState = (state: GlobalGameState) => {
    store.dispatch(setGameState(state))
  }

  private updateTimeCounter = () => {
    const { remainingTime } = store.getState().game
    console.log('remaining time is ' + remainingTime)

    if (remainingTime <= 0) {
      window.clearInterval(this.levelInterval)
      this.setGameOver()
      return
    }

    store.dispatch(setRemainingTime(remainingTime - 1))
  }

  private resetGame = () => {
    window.clearInterval(this.levelInterval)
  }

  private startLevel = () => {
    this.setGameState(GlobalGameState.Started)
    this.drawGame()
    this.levelInterval = window.setInterval(this.updateTimeCounter, 1000)
  }

  public startGame = () => {
    console.log('in start game')
    this.resetGame() // todo reset state to start method
    this.startLevel()
  }

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
