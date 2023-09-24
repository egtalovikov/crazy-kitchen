import Ingredient from '../objects/ingredients/ingredient'
import gameState from '../store/gameState'
import { GlobalGameState, TPoint } from '../types/commonTypes'
import { store } from '@store/index'
import { setGameState, setRemainingTime } from '@store/modules/game/gameSlice'
import CollisionHelper from '../helpers/collisionHelper'
import CookingZone from '../objects/zones/cookingZone'
import DrawingHelper from '../helpers/drawingHelper'

class Engine {
  private levelInterval = -1

  private drawingHelper: DrawingHelper

  constructor(contextDelegate: () => CanvasRenderingContext2D) {
    this.drawingHelper = new DrawingHelper(contextDelegate)
  }

  /* drag&drop logic */

  private setZoneHovered = (ingredient: Ingredient, cZone: CookingZone) => {
    const intersects = CollisionHelper.checkCollision(ingredient, cZone.plate)
    cZone.setHovered(intersects, ingredient.type)
  }

  private placeIngredient = () => {
    //gameState.ingredients.forEach(ingredient => {
    gameState.draggedObjects.forEach(ingredient => {
      if (ingredient.getState().isDragging) {
        ingredient.setIsDragging(false)
      }

      gameState.cookingZones.forEach(zone => {
        // todo iterate all cooking zones and detect zone
        if (CollisionHelper.checkCollision(ingredient, zone.plate)) {
          // TODO: decide will we use cZone coords or plate coords?
          zone.addIngredient(ingredient.type)

          if (zone.getIsHovered()) {
            zone.setIsHovered(false)
          }
          // todo set new cooking zone view here

          // no animation, ingredient is painted here

          // ingredient.setCoordinates(ingredient.basePoint)
        } else {
          // TODO: animate moving back to ingredient zone
          // ingredient.setCoordinates(ingredient.basePoint)
          // rerender with ?
          ingredient.moveBack()
        }
      })
    })
    // delete ingredient after placing
    gameState.draggedObjects = []
  }

  public handleDruggingStart = (point: TPoint) => {
    /* gameState.ingredients.forEach(i => {
      if (CollisionHelper.checkIfPointInZone(point, i)) {
        i.setIsDragging(true)
      }
    }) */

    // TODO: handle cooking zone drag
    gameState.ingredientZones.forEach(zone => {
      if (CollisionHelper.checkIfPointInZone2(point, zone)) {
        zone.isClicked()
      }
    })
    /* if (CollisionHelper.checkIfPointInZone(point, cZone)) {
      CookingZone.setIsDragging(true)
    } */
  }

  public handleDraggingMove = (point: TPoint) => {
    // const ingredient = gameState.ingredients.find(i => i.getState().isDragging)
    const ingredient = gameState.draggedObjects.find(
      i => i.getState().isDragging
    )

    if (ingredient) {
      ingredient.setCoordinates({
        x: point.x - ingredient.width / 2,
        y: point.y - ingredient.height / 2,
      })
      gameState.cookingZones.forEach(zone =>
        this.setZoneHovered(ingredient, zone)
      )

      this.drawingHelper.drawGameFrame()
    } else {
      // TODO: isDragging - can we make common for zone and ingredient? common state parent?
      // also coordinates is set when dragging - common interface?
      const zone = gameState.cookingZones.find(z => z.isDragging)
      if (zone) {
        zone.coordinates = { x: point.x - 20, y: point.y - 20 }
        // this.setOrderHovered(zone, order)
      }
    }
  }

  public handleDraggingStop = () => {
    this.placeIngredient()
    this.drawingHelper.drawGameFrame()
  }

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

  private pause = () => {
    window.clearInterval(this.levelInterval)
  }

  private continue = () => {
    this.levelInterval = window.setInterval(this.mainLoop, 1000)
  }

  private mainLoop = () => {
    // TODO: add client update logic for clients to go and order
    const { remainingTime } = store.getState().game

    if (remainingTime <= 0) {
      this.pause()
      this.setGameOver()
      return
    }

    store.dispatch(setRemainingTime(remainingTime - 1))
    this.drawingHelper.drawGameFrame()
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
