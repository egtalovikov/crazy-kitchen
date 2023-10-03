import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import colHelper from './collisionHelper'
import {
  CurrentDraggingState,
  DragSource,
  DraggingState,
} from '../types/dragTypes'
import BaseZone from '../objects/base/baseZone'

export const draggingState: DraggingState = {
  current: null,
  revertedObjects: [],
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
          draggingState.current = new CurrentDraggingState(
            zone,
            object,
            object.getTargets()
          )
        }
      }
    })
  }

  public static dragStart = (point: TPoint) => {
    DraggingHelper.checkZoneIntersection(point, gameState.ingredientZones)
    DraggingHelper.checkZoneIntersection(point, gameState.cookingZones)
  }

  public static drag = (point: TPoint) => {
    const current = draggingState.current
    if (current) {
      const { object, targets } = current
      object.setCoordinates(point)
      targets.forEach(target => {
        const intersects = object.intersects(target)
        target.setHover(intersects, object)
      })
    }
  }

  public static dragStop = () => {
    const current = draggingState.current
    if (current) {
      const { source, object, targets } = current
      targets.forEach(target => {
        if (object.intersects(target) && target.objectFits(object)) {
          target.addObject(object)
          source.reset()
        } else {
          draggingState.revertedObjects.push(object)
          object.revertToSource(source, () => {
            const index = draggingState.revertedObjects.indexOf(object)
            if (index !== -1) {
              draggingState.revertedObjects.splice(index, 1)
            }
          })
        }
      })
      draggingState.current = null
    }
  }

  public static shouldDrag = (): boolean => {
    return !!draggingState.current
  }
}

export default DraggingHelper
