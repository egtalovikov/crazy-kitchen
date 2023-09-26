import CollisionHelper from '@/game/helpers/collisionHelper'
import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { Recipes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import Dish from './dish'
import gameState from '@/game/store/gameState'

class Client extends BaseFrameObject {
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart
  // TODO: can we make the same for cooking zone and client?
  private isHovered = false
  public movingInterval = -1

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

  private dishFits = (dish: Dish) => this.orders.some(o => o.type === dish.type)

  public setHover = (dish: Dish) => {
    console.log('in client hover')
    // TODO: intersection with client and his orders
    const intersects = CollisionHelper.intersectsWithObjectsArr(
      this,
      dish.ingredients
    )
    const dishFits = this.dishFits(dish)
    if (intersects && dishFits) {
      this.isHovered = true
    }
  }

  public orderFits = (type: Recipes) => {
    return this.orders.some(order => order.type === type)
  }

  // TODO: make requestAnimationFrame
  private moveAway = () => {
    if (this.coordinates.x + this.width <= 0) {
      window.clearInterval(this.movingInterval)
    } else {
      this.coordinates = {
        x: this.coordinates.x - 20,
        y: this.coordinates.y,
      }
    }
  }

  private setOrdersFinished = () => {
    // this.gameState = ClientGameState.Gone
    this.movingInterval = window.setInterval(this.moveAway, 300)
  }

  public addOrder = (dish: Dish) => {
    const index = this.orders.findIndex(order => order.type !== dish.type)
    this.orders.splice(index, 1)
    this.isHovered = false
    gameState.draggedObject = null

    // TODO: dish should know about zone to reset it
    // zone knows about dish to create it on click
    const zone = gameState.cookingZones[0] // temp reset, need to create logic to detect zone to reset
    zone.resetDish()
    // TODO: check later if all orders are finished
    this.setOrdersFinished()
  }
}

export default Client
