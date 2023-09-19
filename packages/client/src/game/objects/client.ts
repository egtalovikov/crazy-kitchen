import clientsParameters from '../parameters/clientParams'
import ClientState from '../store/client'
import { Clients } from '../types/clients'
import { Recipes } from '../types/recipe'
import BaseObject from './baseObject'
import Order from './order'

class Client extends BaseObject {
  public type: Clients
  public orders: Order[] = []

  // todo how we will store orders
  constructor(type: Clients, ordersTypes: Recipes[]) {
    const params = clientsParameters[type]
    // todo add moving logic to client, temp start point
    const state = new ClientState({ x: 800, y: 375 })
    super(params.imageSrc, params.width, params.height, state)
    this.type = type
    // todo calculate order point from client
    ordersTypes.forEach(orderType =>
      this.orders.push(new Order(orderType, { x: 730, y: 325 }))
    )
  }
}

export default Client
