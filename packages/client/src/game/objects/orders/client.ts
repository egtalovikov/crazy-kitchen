import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { BurgerTypes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import Dish from '../dishes/dish'
import { Drawable, Hoverable } from '@/game/types/dragInterfaces'
import Painter from '@/game/core/painter'
import RecipeHelper from '@/game/helpers/recipeHelper'
import BurgerOrder from './burgerOrder'

class Client extends BaseFrameObject implements Drawable, Hoverable {
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart
  // TODO: can we make the same for cooking zone and client?
  private isHovered = false
  public movingInterval = -1

  constructor(type: Clients, burgerTypes: BurgerTypes[]) {
    const params = clientsParameters[type]
    // todo add moving logic to client, temp start point
    super(params.imageSrc, params.width, params.height, params.frameWidth, {
      x: 800,
      y: 375,
    })
    this.type = type
    burgerTypes.forEach(type =>
      this.orders.push(new BurgerOrder(type, this.orderCoordinate()))
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
    const dishFits = this.dishFits(dish)
    if (intersects && dishFits) {
      console.log('in client hover true')
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      console.log('in client hover false')
      this.isHovered = false
    }
  }

  // TODO: make requestAnimationFrame in main loop!
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
    this.orders.forEach(order => painter.drawObject(order))
  }

  public addObject(dish: Dish): void {
    // TODO: не будет работать с разными блюдами одного типа
    // либо для каждого вида бургера свой тип и динамически менять тип
    // либо сверять ингредиенты
    const orders = this.findOrderOfType(dish)
    const index = this.orders.findIndex(order => order == orders[0])
    //const index = this.orders.findIndex(order => order.type !== dish.type)
    this.orders.splice(index, 1)

    // todo do it here or in draggingHelper ?
    this.isHovered = false
    this.setOrdersFinished()
  }

  private findOrderOfType = (dish: Dish) => {
    return this.orders.filter(order => {
      if (order.type === dish.type) {
        return RecipeHelper.ingredientsFitsRecipe(
          order.recipe,
          dish.ingredients
        )
      } else {
        return false
      }
    })
  }

  public objectFits(dish: Dish): boolean {
    const hasDishType = this.orders.some(order => order.type === dish.type)
    return hasDishType && !!this.findOrderOfType(dish).length
  }
}

export default Client
