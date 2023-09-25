import CollisionHelper from '@/game/helpers/collisionHelper'
import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { Recipes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import CookingZone from '../zones/cookingZone'

class Client extends BaseFrameObject {
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart
  // TODO: can we make the same for cooking zone and client?
  private isHovered = false

  constructor(type: Clients, recipes: Recipes[]) {
    const params = clientsParameters[type]
    // todo add moving logic to client, temp start point
    super(params.imageSrc, params.width, params.height, params.frameWidth, {
      x: 800,
      y: 375,
    })
    this.type = type
    recipes.forEach(recipe =>
      this.orders.push(new Order(recipe, this.orderCoordinate()))
    )
  }

  private orderCoordinate = () => {
    // TODO: calculate position for several orders
    return {
      x: this.coordinates.x - 70,
      y: this.coordinates.y + 50,
    }
  }

  private dishFits = (dish: CookingZone): boolean => {
    console.log(dish)
    console.log(this.isHovered)
    return false
  }
  // TODO: replace with dish
  public setHover = (dish: CookingZone) => {
    // TODO: intersection with client and his orders
    const intersects = CollisionHelper.intersects(dish, this)
    const dishFits = this.dishFits(dish)
    if (intersects && dishFits) {
      this.isHovered = true
    }
  }
}

export default Client
