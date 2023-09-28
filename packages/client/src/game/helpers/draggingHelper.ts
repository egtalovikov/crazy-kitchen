import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import colHelper from './collisionHelper'
import BaseZone from '../objects/base/baseZone'
import { DragSource, Draggable, Hoverable } from '../types/dragInterfaces'
import IngredientZone from '../objects/zones/ingredientZone'
import CookingZone from '../objects/zones/cookingZone'

type DraggingState = {
  source: DragSource | null
  object: Draggable | null
  targets: Hoverable[] | null
}

export const draggingState: DraggingState = {
  source: null,
  object: null,
  targets: null,
}

class DraggingHelper {
  private static zoneIntersection(
    point: TPoint,
    zones: IngredientZone[] | CookingZone[] // TODO: can we remove this dependency?
  ) {
    zones.forEach(zone => {
      if (colHelper.intersectsWithPoint(point, zone)) {
        const object = zone.getDraggable()
        if (object) {
          object.setCoordinates(point)
          draggingState.object = object
          draggingState.source = zone
          draggingState.targets = object.getTargets()
        }
      }
    })
  }

  public static dragStart = (point: TPoint) => {
    DraggingHelper.zoneIntersection(point, gameState.ingredientZones)
    DraggingHelper.zoneIntersection(point, gameState.cookingZones)
  }

  public static drag = (point: TPoint) => {
    const object = draggingState.object
    if (object) {
      object.setCoordinates(point)
      draggingState.targets?.forEach(target => {
        // TODO: can we remove this cast?
        const targetZone = target as unknown as BaseZone
        const intersects = colHelper.intersectsWithPoint(point, targetZone)
        target.setHover(intersects, object)
      })
    }
  }

  public static dragStop = () => {
    const object = draggingState.object
    if (object) {
      draggingState.targets?.forEach(target => {
        if (object.intersects(target) && target.objectFits(object)) {
          target.addObject(object)
          draggingState.source?.reset()
        } else {
          object.revertToSource()
        }
      })

      draggingState.object = null
      draggingState.source = null
      draggingState.targets = null
    }
  }

  public static shouldDrag = (): boolean => {
    return !!draggingState.object
  }
}

export default DraggingHelper
