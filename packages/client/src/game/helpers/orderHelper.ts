import Ingredient from '../objects/ingredient'
import { Ingredients } from '../types/commonTypes'

class OrderHelper {
  public static burgerFinished = (
    currentOrder: Record<Ingredients, number>,
    ingredients: Ingredient[]
  ): boolean => {
    // Подумать как лучше сделать проверку
    const onBunIngredients: Record<Ingredients, number> = {
      [Ingredients.Cheese]: 0,
      [Ingredients.Cutlet]: 0,
      [Ingredients.Salad]: 0,
      [Ingredients.Tomato]: 0,
    }
    ingredients.forEach(i => {
      if (i.getState().isOnBun) {
        onBunIngredients[i.type] += 1
      }
    })

    let burgerFinished = true
    console.log('my list')
    console.log(onBunIngredients)
    console.log('order from level')
    console.log(currentOrder)

    // eslint-disable-next-line
    for (let type in Ingredients) {
      // todo ?
      const key = type as unknown as Ingredients
      if (onBunIngredients[key] !== currentOrder[key]) {
        burgerFinished = false
        break
      }
    }

    return burgerFinished
  }
}

export default OrderHelper
