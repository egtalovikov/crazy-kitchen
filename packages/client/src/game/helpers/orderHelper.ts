import Ingredient from '../objects/ingredients/ingredient'
import { Ingredients } from '../types/ingredients'

class OrderHelper {
  public static isOrderFinished = (
    currentOrder: Record<Ingredients, number>,
    ingredients: Ingredient[]
  ): boolean => {
    // Подумать как лучше сделать проверку
    const orderIngredients: Record<Ingredients, number> = {
      // [Ingredients.Cheese]: 0,
      [Ingredients.Cutlet]: 0,
      [Ingredients.Salad]: 0,
      [Ingredients.Tomato]: 0,
      [Ingredients.Bread]: 0,
    }
    ingredients.forEach(i => {
      if (i.getState().isInOrder) {
        orderIngredients[i.type] += 1
      }
    })

    let burgerFinished = true
    console.log('my list')
    console.log(orderIngredients)
    console.log('order from level')
    console.log(currentOrder)

    // eslint-disable-next-line
    for (let type in Ingredients) {
      // todo ?
      const key = type as unknown as Ingredients
      if (orderIngredients[key] !== currentOrder[key]) {
        burgerFinished = false
        break
      }
    }

    return burgerFinished
  }

  public static orderScore = (
    currentOrder: Record<Ingredients, number>
  ): number => {
    console.log(currentOrder)
    // todo make more complicated logic to calc score
    return 1
  }
}

export default OrderHelper
