import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import {
  setGameState,
  setRemainingTime,
  setScore,
} from '@store/modules/game/gameSlice'
import CollisionHelper from '../utils/collisionHelper'

class Engine {
  private levelInterval = -1
  // todo do we need this or reset is solving the problem?
  private isIntervalRunning = () => this.levelInterval !== -1
  private painter: Painter
  private contextDelegate: () => CanvasRenderingContext2D

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

  public ingredientClicked = (point: TPoint, ingredient: Ingredient) => {
    const coordinate = ingredient.getState().coordinates
    if (
      point.x >= coordinate.x &&
      point.x <= coordinate.x + ingredient.width &&
      point.y >= coordinate.y &&
      point.y <= coordinate.y + ingredient.height
    ) {
      ingredient.setIsDragging(true)
    }
  }

  public checkDragging = (point: TPoint) => {
    gameState.ingredients.forEach(i => {
      this.ingredientClicked(point, i)
    })

    console.log('new state')
    console.log(gameState)
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
    const { x: breadX, y: breadY } = gameState.bread.state.coordinates
    console.log(breadX + ' ' + breadY)
    console.log('in setIsOnBun')
    console.log(gameState.ingredients[0].getState().isDragging)
    gameState.ingredients.forEach(i => {
      //if (i.getState().isDragging) { todo bug?
      //}
      if (i.getState().isDragging) {
        i.setIsDragging(false)
      }

      if (
        CollisionHelper.checkCollision(
          i.state.coordinates,
          i.width,
          i.height,
          gameState.bread.state.coordinates,
          gameState.bread.width,
          gameState.bread.height
        )
      ) {
        i.getState().isOnBun = true
        i.getState().coordinates.x = breadX + 50 // todo
        i.getState().coordinates.y = breadY + 50 // temp fix, know that it is a magic number, need more time to refactor this
      }
    })
  }

  private setBurgerFinished = () => {
    const burgerFinished = gameState.ingredients.every(
      i => i.getState().isOnBun
    )
    console.log('is burder finished')
    console.log(burgerFinished)
    if (burgerFinished) {
      gameState.burgersFinished++ // todo remove duplicate logic
      store.dispatch(setScore(gameState.burgersFinished))
      gameState.resetIngredients()
    }
  }

  private setGameOver = () => {
    const gameState = store.getState().game
    console.log('set complete state')
    if (gameState.score === gameState.level.ordersCount) {
      // game winned
      this.setGameState(GlobalGameState.Winned)
    } else {
      // game failed
      this.setGameState(GlobalGameState.Failed)
    }
  }

  public draggingStopped = () => {
    this.setIsOnBun()
    this.setBurgerFinished()
    this.drawGame()
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
    this.resetGame()
    this.startLevel()
  }

  public isGameOver = () => {
    const { gameState } = store.getState().game
    return (
      gameState == GlobalGameState.Failed || gameState == GlobalGameState.Winned
    )
  }

  // todo reset state to start method
}

export default Engine
