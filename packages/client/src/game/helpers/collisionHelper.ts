import BaseObject from '../objects/baseObject'
import { TPoint } from '../types/commonTypes'

class CollisionHelper {
  public static checkCollision = (object1: BaseObject, object2: BaseObject) => {
    const point1 = object1.state.coordinates
    const point2 = object2.state.coordinates
    return (
      point1.x < point2.x + object2.width &&
      point1.x + object1.width > point2.x &&
      point1.y < point2.y + object2.height &&
      point1.y + object1.height > point2.y
    )
  }

  // todo better name?
  public static checkIfPointIsOnObject = (
    point: TPoint,
    object: BaseObject
  ) => {
    const coordinates = object.state.coordinates
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
      parentObject.state.coordinates.x +
      parentObject.width / 2 -
      childObject.width / 2
    const y =
      parentObject.state.coordinates.y +
      parentObject.height / 2 -
      childObject.height / 2
    return { x, y }
  }
}

export default CollisionHelper
