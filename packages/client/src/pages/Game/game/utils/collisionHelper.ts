import { TPoint } from '../types/commonTypes'

class CollisionHelper {
  public static checkCollision = (
    point1: TPoint,
    width1: number,
    height1: number,
    point2: TPoint,
    width2: number,
    height2: number
  ) => {
    return (
      point1.x < point2.x + width2 &&
      point1.x + width1 > point2.x &&
      point1.y < point2.y + height2 &&
      point1.y + height1 > point2.y
    )
  }
}

export default CollisionHelper

/*  if (
        Math.abs(ingredientX - breadX) <= 20 &&
        Math.abs(ingredientY - breadY) <= 20
      ) { */

/* if (isCheeseOnBun) {
        ctx.drawImage(cheeseImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isTomatoOnBun) {
        ctx.drawImage(tomatoImage, bunX - 20, bunY - 20, 40, 40)
      }
      if (isPattyOnBun) {
        ctx.drawImage(pattyImage, bunX - 30, bunY + 20, 60, 30)
      } */
