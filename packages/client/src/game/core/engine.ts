import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import { GlobalGameState, Ingredients, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import {
  setGameState,
  setRemainingTime,
  setScore,
} from '@store/modules/game/gameSlice'
import CollisionHelper from '../helpers/collisionHelper'
import OrderHelper from '../helpers/orderHelper'

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

  /* todo move all this level state logic (remaining time, current order) somewhere ? */
  private drawLevelState = () => {
    const { game: state } = store.getState()
    const timeText = `Время: ${state.remainingTime} сек.`
    this.painter.drawTime(timeText)
    const scoreText = `Собрано бургеров: ${state.score}`
    this.painter.drawScore(scoreText)

    const currentOrder = state.level.orders[state.orderIndex]
    const ingredientsText = `Нужно добавить: 
    ${currentOrder[Ingredients.Tomato]} помидоров,
    ${currentOrder[Ingredients.Cheese]} кусочков сыра,    
    ${currentOrder[Ingredients.Cutlet]} котлет,
    ${currentOrder[Ingredients.Salad]} листов салата`
    this.painter.drawIngredients(ingredientsText)
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
      // Подумать, часть ингридиентов могут лежать не на месте и не на булке, что делать с ними
      gameState.addIngredient(ingredient.type)
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
    const { level: currentLevel, orderIndex } = store.getState().game

    // todo check index
    const currentOrder = currentLevel.orders[orderIndex]

    const burgerFinished = OrderHelper.burgerFinished(
      currentOrder,
      gameState.ingredients
    )
    console.log(burgerFinished)

    if (burgerFinished) {
      const newScore = store.getState().game.score + 1
      // todo make more complicated logic to calc score
      store.dispatch(setScore(newScore))
      gameState.resetIngredients()
      if (newScore === currentLevel.ordersCount) {
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
    // console.log('remaining time is ' + remainingTime)

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
