import BaseObject from '../objects/baseObject'
import Ingredient from '../objects/ingredient'
import Painter from './painter'
import gameState from '../store/gameState'
import {
  GameObjects,
  GlobalGameState,
  Ingredients,
  TPoint,
} from '../types/commonTypes'

class Engine {
  private timeInSeconds = 0

  private painter: Painter

  constructor(ctx: CanvasRenderingContext2D) {
    this.painter = new Painter(ctx)
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
  }

  public handleDragging = (point: TPoint) => {
    gameState.ingredients.forEach(i => {
      if (i.getState().isDragging) {
        i.setCoordinates(point)
        this.drawGame()
      }
    })
  }

  private setIsOnBun = () => {
    const { x: breadX, y: breadY } = gameState.bread.state.coordinates

    gameState.ingredients.forEach(i => {
      if (i.getState().isDragging) {
        i.setIsDragging(false)
        const { x: ingredientX, y: ingredientY } = i.getState().coordinates
        if (
          Math.abs(ingredientX + 20 - breadX) <= 20 &&
          Math.abs(ingredientY + 20 - breadY) <= 20
        ) {
          i.getState().isOnBun = true
          i.getState().coordinates.x = breadX - 20
          i.getState().coordinates.y = breadY - 20
        }
      }
    })

    /* if (isCheeseOnBun) {
        ctx.drawImage(cheeseImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isTomatoOnBun) {
        ctx.drawImage(tomatoImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isPattyOnBun) {
        ctx.drawImage(pattyImage, bunX - 30, bunY + 20, 60, 30)
      } */
  }

  private setBurgerFinished = () => {
    const burgerFinished = gameState.ingredients.every(
      i => i.getState().isOnBun
    )
    if (burgerFinished) {
      gameState.burgersFinished++

      gameState.resetIngredients()
    }
  }

  public draggingStopped = () => {
    this.setIsOnBun()
    this.setBurgerFinished()
  }

  public isGameRunning = () => {
    return gameState.globalState === GlobalGameState.Started
  }
}

export default Engine
