import gameState from '../store/gameState'
import { TPoint } from '../types/commonTypes'
import colHelper from './collisionHelper'
import BaseZone from '../objects/base/baseZone'
import { DragSource, Draggable, Hoverable } from '../types/dragInterfaces'

//TODO: хелпер не должен знать про реализацию обьектов,
// оставить в нем добавление в стейт draggable обьекта, утановку координат и возврат в нужную зону
// либо удаление на успешный драг!

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
  public static dragStart = (point: TPoint) => {
    // TODO: как убрать тут зависимость от реализации и сделать одним блоком?
    gameState.ingredientZones.forEach(zone => {
      if (colHelper.intersectsWithPoint(point, zone)) {
        const object = zone.getDraggable()
        object.setCoordinates(point)
        draggingState.object = object
        draggingState.source = zone
        draggingState.targets = object.getTargets()
      }
    })

    gameState.cookingZones.forEach(zone => {
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

  public static drag = (point: TPoint) => {
    const object = draggingState.object
    if (object) {
      object?.setCoordinates(point)
      draggingState.targets?.forEach(target => {
        // TODO: приведение типа, можно ли упростить?
        // сделать не implements ?
        const targetZone = target as unknown as BaseZone
        const intersects = colHelper.intersectsWithPoint(point, targetZone)
        target.setHover(intersects, object)
      })
    }
  }

  public static dragStop = () => {
    const object = draggingState.object
    console.log('in drag stop')
    if (object) {
      console.log(draggingState.targets)
      draggingState.targets?.forEach(target => {
        const intersects = true // object.intersects(target)
        if (intersects && target.objectFits(object)) {
          console.log('in drag stop2')
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
