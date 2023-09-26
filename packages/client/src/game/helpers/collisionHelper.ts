import BaseZone from '../objects/base/baseZone'
import { TPoint } from '../types/commonTypes'

class CollisionHelper {
  public static objectsIntersect = (
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

  public static intersectsWithObjectsArr = (
    object: BaseZone,
    objects: BaseZone[]
  ): boolean => {
    return objects.some(o => CollisionHelper.objectsIntersect(object, o))
  }

  public static intersectsWithPoint = (point: TPoint, object: BaseZone) => {
    const coordinates = object.coordinates
    return (
      point.x >= coordinates.x &&
      point.x <= coordinates.x + object.width &&
      point.y >= coordinates.y &&
      point.y <= coordinates.y + object.height
    )
  }
}

export default CollisionHelper
