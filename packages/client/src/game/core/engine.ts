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
  private drawClients = () => {
    this.painter.clearCanvas()
    this.painter.drawObjects(gameState.clients)
    // todo every client order position should be calculated
    this.painter.drawObjects(gameState.clients[0].orders)
  }

  private drawCookingZones = () =>
    this.painter.drawObjects([gameState.cookingZone.plate])

  private drawIngredients = () =>
    this.painter.drawObjects(gameState.ingredients)

  public drawGame = () => {
    this.drawClients()
    this.drawCookingZones()
    this.drawIngredients()
    DrawStateHelper.drawLevelState(this.painter, store.getState().game)
  }

  /* drag&drop logic */

  public setIsDragging = (point: TPoint, ingredient: Ingredient) => {
    if (CollisionHelper.checkIfPointIsOnObject(point, ingredient)) {
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
        cZone.upcomingOrder.addIngredient(ingredient.type)

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
    // todo form order on plate in gameState upcoming orders
    // this.setOrderFinished()
    this.drawGame()
  }

  /* drag&drop logic end */

  /* orders logic */

  /* private getCurrentOrder = () => {
    const { level, orderIndex } = store.getState().game
    if (orderIndex >= level.orders.length) {
      throw Error('order index is out of orders array')
    }
    return level.orders[orderIndex]
  }

  private isLevelFinished = (): boolean => {
    const { level, ordersFinished } = store.getState().game
    return ordersFinished === level.ordersCount
  }

  private setOrderScore = (currentOrder: Record<Ingredients, number>) => {
    const newScore =
      store.getState().game.score + OrderHelper.orderScore(currentOrder)
    store.dispatch(setScore(newScore))
  }

  private setOrderFinished = () => {
    const currentOrder = this.getCurrentOrder()
    if (OrderHelper.isOrderFinished(currentOrder, gameState.ingredients)) {
      this.setOrderScore(currentOrder)
      gameState.resetIngredients()
      if (this.isLevelFinished()) {
        this.setGameState(GlobalGameState.Winned)
        // todo set index with check?
        store.dispatch(setOrderIndex(0))
      } else {
        const newIndex = store.getState().game.orderIndex + 1
        store.dispatch(setOrderIndex(newIndex))
      }
    }
  } */

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

  private resetGame = () => window.clearInterval(this.levelInterval)

  private startLevel = () => {
    this.setGameState(GlobalGameState.Started)
    this.drawGame()
    this.levelInterval = window.setInterval(this.updateTimeCounter, 1000)
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
