import clientsParameters from '../../parameters/clientParams'
import { ClientGameState, Clients } from '../../types/clients'
import { BurgerTypes } from '../../types/recipe'
import BaseFrameObject from '../base/baseFrameObject'
import Order from './order'
import Dish from '../dishes/dish'
import { Hoverable } from '@gameTypes/dragTypes'
import Painter from '@game/core/painter'
import RecipeHelper from '@game/helpers/recipeHelper'
import BurgerOrder from './burgerOrder'
import { Drawable, Animatable } from '@gameTypes/interfaces'

class Client
  extends BaseFrameObject
  implements Drawable, Hoverable, Animatable
{
  public type: Clients
  public orders: Order[] = []
  public gameState = ClientGameState.WaitingForStart
  // TODO: should we include this to Hoverable interface and break open-closed principle?
  private isHovered = false
  private isMoving = false

  constructor(type: Clients, burgerTypes: BurgerTypes[]) {
    const params = clientsParameters[type]
    // TODO: add moving logic to client, temp start point
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

  private setOrdersFinished = () => {
    if (!this.orders.length) {
      // TODO: add trajectory
      this.isMoving = true
    }
  }

  private findOrderOfType = (dish: Dish) => {
    return this.orders.find(order => {
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

  public update = (time: number) => {
    // TODO: make update using trajectory?
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
    // dish type is not the only criteria for comparision
    // we need to check all ingredients
    // e.g. dish type 'Burger', ingredients: tomato, cutlet & bread
    const order = this.findOrderOfType(dish)
    if (order) {
      const index = this.orders.findIndex(o => o == order)
      this.orders.splice(index, 1)
      // TODO: do it here or in draggingHelper ?
      this.isHovered = false
      this.setOrdersFinished()
    } else {
      throw Error('Client addObject method: No such order')
    }
  }
  public objectFits(dish: Dish): boolean {
    const hasDishType = this.orders.some(order => order.type === dish.type)
    return hasDishType && !!this.findOrderOfType(dish)
  }

  // TODO: is there a way to create only one method for this and dish.ts setHover?
  public setHover = (intersects: boolean, dish: Dish) => {
    if (intersects && this.objectFits(dish) && !this.isHovered) {
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      this.isHovered = false
    }
  }
}

export default Client
