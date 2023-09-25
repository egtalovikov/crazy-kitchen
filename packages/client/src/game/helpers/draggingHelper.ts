import Ingredient from '../objects/ingredients/ingredient'
import CookingZone from '../objects/zones/cookingZone'
import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import CollisionHelper from './collisionHelper'

class DraggingHelper {
  public static dragStart = (point: TPoint) => {
    gameState.ingredientZones.forEach(
      zone =>
        CollisionHelper.checkIfPointInZone(point, zone) && zone.isClicked()
    )
    gameState.cookingZones.forEach(
      zone =>
        CollisionHelper.checkIfPointInZone(point, zone) && zone.isClicked()
    )
  }

  public static drag = (point: TPoint) => {
    const object = gameState.draggedObject

    if (object) {
      const ingredient = object as Ingredient
      if (ingredient) {
        ingredient.setCoordinates({
          x: point.x - ingredient.width / 2,
          y: point.y - ingredient.height / 2,
        })
        gameState.cookingZones.forEach(zone => zone.setHovered(ingredient))
      } else {
        const order = object as CookingZone
        order.coordinates = { x: point.x - 20, y: point.y - 20 }
        // iterate orders and set hovered
        gameState.clients.forEach(client => client.setHover(order))
      }
    }
  }

  public static dragStop = () => {
    const object = gameState.draggedObject
    if (object) {
      const ingredient = object as Ingredient
      gameState.cookingZones.forEach(zone => {
        if (CollisionHelper.intersects(ingredient, zone.plate)) {
          // TODO: decide will we use cZone coords or plate coords?
          zone.addIngredient(ingredient.type)

          if (zone.getIsHovered()) {
            zone.setIsHovered(false)
          }
        } else {
          // TODO: animate moving back to ingredient zone basePoint
          ingredient.moveBack()
        }
      })

      // TODO: gameState resoncibility? make method to delete?
      gameState.draggedObject = null
    }
  }

  public static shouldDrag = (): boolean => {
    return !!gameState.draggedObject
  }
}

export default DraggingHelper
