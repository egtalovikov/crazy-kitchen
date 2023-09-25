import BaseObject from '../objects/base/baseObject'
import BaseZone from '../objects/base/baseZone'
import { TPoint } from '../types/commonTypes'

class CollisionHelper {
  public static intersects = (
    object1: BaseZone,
    object2: BaseZone
  ): boolean => {
    const point1 = object1.coordinates
    const point2 = object2.coordinates
    return (
      point1.x < point2.x + object2.width &&
      point1.x + object1.width > point2.x &&
      point1.y < point2.y + object2.height &&
      point1.y + object1.height > point2.y
    )
  }

  public static intersectsWithArr = (
    object: BaseZone,
    objects: BaseZone[]
  ): boolean => {
    return objects.some(o => CollisionHelper.intersects(object, o))
  }

  // todo do we need this?
  /* public static checkIfPointInZone = (point: TPoint, object: BaseObject) => {
    const coordinates = object.coordinates
    return (
      point.x >= coordinates.x &&
      point.x <= coordinates.x + object.width &&
      point.y >= coordinates.y &&
      point.y <= coordinates.y + object.height
    )
  }*/

  public static checkIfPointInZone = (point: TPoint, object: BaseZone) => {
    const coordinates = object.coordinates
    return (
      point.x >= coordinates.x &&
      point.x <= coordinates.x + object.width &&
      point.y >= coordinates.y &&
      point.y <= coordinates.y + object.height
    )
  }

  // todo better name
  public static calculateOverlapCenter = (
    parentObject: BaseObject,
    childObject: BaseObject
  ): TPoint => {
    const x =
      parentObject.coordinates.x +
      parentObject.width / 2 -
      childObject.width / 2
    const y =
      parentObject.coordinates.y +
      parentObject.height / 2 -
      childObject.height / 2
    return { x, y }
  }
}

export default CollisionHelper
