import BaseSpriteObject from '../base/baseSpriteObject'
import Painter from '@/game/core/painter'
import CollisionHelper from '@/game/helpers/collisionHelper'
import gameState from '@/game/store/gameState'
import { TPoint } from '@gameTypes/commonTypes'
import Client from '../orders/client'
import CookingZone from '../zones/cookingZone'
import { Drawable } from '@gameTypes/interfaces'

class Drink extends BaseSpriteObject implements Drawable {
  /* drawing logic */

  public draw(painter: Painter): void {
    painter.tempDrawFrame(this)
  }
  /* drag&drop logic */

  public setCoordinates(point: TPoint): void {
    this.coordinates = { ...point }
  }

  public getTargets(): Client[] {
    return gameState.clients
  }

  public intersects(client: Client): boolean {
    return CollisionHelper.objectsIntersect(this, client)
  }

  public revertToSource(zone: CookingZone): void {
    // TODO: animate revert flying
    this.setCoordinates(zone.coordinates)
  }
}

export default Drink
