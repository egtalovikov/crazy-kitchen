import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { Recipes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'

class Client extends BaseFrameObject {
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart

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
}

export default Client
