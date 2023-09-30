import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import colHelper from './collisionHelper'
import { DragSource, Draggable, Hoverable } from '../types/dragInterfaces'
import BaseZone from '../objects/base/baseZone'

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
  private static checkZoneIntersection(
    point: TPoint,
    zones: (DragSource & BaseZone)[]
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
    DraggingHelper.checkZoneIntersection(point, gameState.ingredientZones)
    DraggingHelper.checkZoneIntersection(point, gameState.cookingZones)
  }

  public static drag = (point: TPoint) => {
    const object = draggingState.object
    if (object) {
      object.setCoordinates(point)
      draggingState.targets?.forEach(target => {
        const intersects = object.intersects(target)
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
          draggingState.source = null
          draggingState.object = null
        } else {
          object.revertToSource(draggingState.source!, () => {
            draggingState.source = null
            draggingState.object = null
            // TODO: intersection when old object is moving and new is assigned?
          })
        }
      })

      draggingState.targets = null
    }
  }

  public static shouldDrag = (): boolean => {
    return !!draggingState.object
  }
}

export default DraggingHelper
