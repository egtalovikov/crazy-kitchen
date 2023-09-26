import Ingredient from '../objects/ingredients/ingredient'
import Dish from '../objects/orders/dish'
import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import colHelper from './collisionHelper'

class DraggingHelper {
  public static dragStart = (point: TPoint) => {
    gameState.ingredientZones.forEach(
      zone => colHelper.intersectsWithPoint(point, zone) && zone.isClicked()
    )
    gameState.cookingZones.forEach(
      zone => colHelper.intersectsWithPoint(point, zone) && zone.isClicked()
    )
  }

  public static drag = (point: TPoint) => {
    const object = gameState.draggedObject

    if (object) {
      if (object instanceof Dish) {
        const dish = object as Dish
        dish.setIngredientCoordinates(point)
        gameState.clients.forEach(client => client.setHover(dish))
      } else if (object instanceof Ingredient) {
        const ingredient = object as Ingredient
        if (ingredient) {
          ingredient.setCoordinates({
            x: point.x - ingredient.width / 2,
            y: point.y - ingredient.height / 2,
          })
          gameState.cookingZones.forEach(zone => zone.setHovered(ingredient))
        }
      } else {
        throw Error('Invalid object in gameState.draggedObject')
      }
    }
  }

  public static dragStop = () => {
    const object = gameState.draggedObject
    if (object) {
      if (object instanceof Dish) {
        const dish = object as Dish
        gameState.clients.forEach(client => {
          if (
            colHelper.intersectsWithObjectsArr(client, dish.ingredients) &&
            client.orderFits(dish.type)
          ) {
            client.addOrder(dish)
          } else {
            dish.backToCookingZone()
            //dish.moveBack()
          }
        })
      } else if (object instanceof Ingredient) {
        const ingredient = object as Ingredient
        gameState.cookingZones.forEach(zone => {
          if (colHelper.objectsIntersect(ingredient, zone)) {
            zone.addIngredient(ingredient.type)
          } else {
            // TODO: animate moving back to ingredient zone basePoint
            ingredient.moveBack()
          }
        })
      }

      // TODO: gameState resoncibility? make method to delete?
      gameState.draggedObject = null
    }
  }

  public static shouldDrag = (): boolean => {
    return !!gameState.draggedObject
  }
}

export default DraggingHelper
