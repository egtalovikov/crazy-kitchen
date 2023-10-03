import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { BurgerTypes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import Dish from '../dishes/dish'
import { Hoverable } from '@/game/types/dragTypes'
import Painter from '@/game/core/painter'
import RecipeHelper from '@/game/helpers/recipeHelper'
import BurgerOrder from './burgerOrder'
import { Drawable, Animatable } from '@/game/types/interfaces'

// TODO: draw all client orders!
class Client
  extends BaseFrameObject
  implements Drawable, Hoverable, Animatable
{
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart
  // TODO: should we include this to Hoverable interface and break open-closed principle?
  public isHovered = false
  public movingInterval = -1
  private isMoving = false

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

  private setOrdersFinished = () => {
    if (!this.orders.length) {
      this.isMoving = true
    }
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

  /* animate logic */

  public update = () => {
    if (this.isMoving) {
      if (this.coordinates.x + this.width <= 0) {
        this.isMoving = false
      } else {
        this.coordinates.x -= 2
      }
    }
  }

  /* drawing logic */

  public draw(painter: Painter): void {
    painter.drawObject(this)
    this.orders.forEach(order => painter.drawObject(order))
  }

  /* drag&drop logic */

  public addObject(dish: Dish): void {
    // TODO: не будет работать с разными блюдами одного типа
    // либо для каждого вида бургера свой тип и динамически менять тип
    // либо сверять ингредиенты
    const orders = this.findOrderOfType(dish)
    // temp fix to remove order from client
    const index = this.orders.findIndex(order => order == orders[0])
    this.orders.splice(index, 1)

    // TODO: do it here or in draggingHelper ?
    this.isHovered = false
    this.setOrdersFinished()
  }

  public objectFits(dish: Dish): boolean {
    const hasDishType = this.orders.some(order => order.type === dish.type)
    return hasDishType && !!this.findOrderOfType(dish).length
  }

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
}

export default Client
