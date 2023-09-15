import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '../../../../store'
import {
  setGameState,
  setRemainingTime,
  setScore,
} from '../../../../store/modules/game/gameSlice'
import CollisionHelper from '../utils/collisionHelper'

class Engine {
  private timeInSeconds = 0
  private levelInterval = -1
  private static instance?: Engine

  private painter: Painter

  constructor(ctx: CanvasRenderingContext2D) {
    this.painter = new Painter(ctx)
  }

  public static getInstance = (ctx?: CanvasRenderingContext2D): Engine => {
    if (!Engine.instance && ctx) {
      Engine.instance = new Engine(ctx)
    }
    if (Engine.instance) {
      return Engine.instance
    }
    throw Error('no context provided')
  }

  private drawBackground = () => {
    this.painter.clearCanvas()
    this.painter.drawFrame(gameState.bread)
    this.painter.drawFrame(gameState.person)
    this.painter.drawFrame(gameState.order)
  }

  private drawIngredients = () => {
    gameState.ingredients.forEach(i => this.painter.drawFrame(i))
  }

  public drawGame = () => {
    this.drawBackground()
    this.drawIngredients()
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
    gameState.ingredients.forEach(i => {
      if (i.getState().isDragging) {
        i.setCoordinates(point)
      }
    })
    this.drawGame()
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
        i.getState().coordinates.x = breadX
        i.getState().coordinates.y = breadY
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
      clearInterval(this.levelInterval)
      this.setGameState(GlobalGameState.Finished)
      return
    }

    store.dispatch(setRemainingTime(remainingTime - 1))
  }

  public startLevel = () => {
    this.levelInterval = window.setInterval(this.updateTimeCounter, 1000)
  }

  public startGame = () => {
    this.setGameState(GlobalGameState.Started)
  }

  // public isGameOver = ()=>  todo check here
}

export default Engine

// todo check all logic is preserved

// Флаг для отслеживания анимации перемещения котлетки.
// let isAnimating = false

// Переменная для отображения времени (в секундах).
// let timeInSeconds = 0

// Функция для анимации перемещения котлетки на булочку.
/* const animatePatty = () => {
      const targetX = bunX - 30
      const targetY = bunY + 20
      const deltaX = (targetX - pattyX) / 20
      const deltaY = (targetY - pattyY) / 20
      let frameCount = 0

      const animationFrame = () => {
        if (pattyX < targetX) {
          pattyX += deltaX
        }
        if (pattyY < targetY) {
          pattyY += deltaY
        }

        drawGame()

        if (pattyX < targetX || pattyY < targetY) {
          requestAnimationFrame(animationFrame)
        } else {
          isAnimating = false
          frameCount = 0
          pattyX = bunX - 30
          pattyY = bunY + 20
        }

        frameCount++
      }
      requestAnimationFrame(animationFrame)
    } */

// Функция для обновления игры (таймер).
/* const updateGame = () => {
      timeInSeconds += 1

      if (timeInSeconds >= 60) {
        alert(`Игра окончена!`)
        clearInterval(gameInterval)
        return
      }

      setBurgerStats(prevState => ({
        ...prevState,
        timeRemaining: 60 - timeInSeconds,
      }))
    } */

// const gameInterval = setInterval(updateGame, 1000)
