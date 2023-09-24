import clientsParameters from '../parameters/clientParams'
import { ClientGameState, Clients } from '../types/clients'
import { Recipes } from '../types/recipe'
import BaseFrameObject from './base/baseFrameObject'
// import Order from './order'

class Client extends BaseFrameObject {
  public type: Clients
  // public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart

  // todo how we will store orders
  constructor(type: Clients, ordersTypes: Recipes[]) {
    const params = clientsParameters[type]
    console.log(ordersTypes)
    // todo add moving logic to client, temp start point
    super(params.imageSrc, params.width, params.height, params.frameWidth, {
      x: 800,
      y: 375,
    })
    this.type = type
    // todo calculate order point from client
    /* ordersTypes.forEach(orderType =>
      //this.orders.push(new Order(orderType, { x: 730, y: 325 }))
    ) */
  }
}

export default Client
