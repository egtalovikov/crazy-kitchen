import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { Recipes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import Dish from '../dishes/dish'
import { Draggable, Drawable, Hoverable } from '@/game/types/dragInterfaces'
import Painter from '@/game/core/painter'

class Client extends BaseFrameObject implements Drawable, Hoverable {
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

  public setHover = (intersects: boolean, dish: Dish) => {
    //console.log('in client hover')
    const dishFits = this.dishFits(dish)
    if (intersects && dishFits) {
      console.log('in client hover true')
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      console.log('in client hover false')
      this.isHovered = false
    }
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
    if (!this.orders.length) {
      this.movingInterval = window.setInterval(this.moveAway, 300)
    }
  }

  public draw(painter: Painter): void {
    painter.drawObject(this)
    this.orders.forEach(order => painter.drawObject(order.image))
  }

  public addObject(object: Draggable): void {
    // TODO: cast remove!
    const dish = object as unknown as Dish
    console.log('in add order to client')
    console.log(this.orders)

    const index = this.orders.findIndex(order => order.type !== dish.type)
    this.orders.splice(index, 1)
    console.log(this.orders)

    // todo do it here or in draggingHelper ?

    this.isHovered = false

    this.setOrdersFinished()
  }

  public objectFits(object: Draggable): boolean {
    // TODO: cast remove!
    const dish = object as unknown as Dish
    const hasDishType = this.orders.some(order => order.type === dish.type)
    // TODO: сравнить совпадения всех ингредиентов!
    if (hasDishType) {
      console.log('here we need to add comparision')
    }

    return hasDishType
  }
}

export default Client
