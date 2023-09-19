import recipeParameters from '../parameters/recipeParams'
import { Ingredients } from '../types/ingredients'
import { Recipes, TRecipe, emptyOrder } from '../types/recipe'

enum UpcomingOrderState {
  Empty,
  InProgress,
  Ready,
}

class UpcomingOrder {
  public state = UpcomingOrderState.Empty
  public recipe: TRecipe
  public ingredients: TRecipe

  constructor(type: Recipes) {
    this.state = UpcomingOrderState.Empty
    this.ingredients = emptyOrder
    this.recipe = recipeParameters[type].recipe
  }

  private checkReadyState = () => {
    let isReady = true
    for (const ingredient in this.recipe) {
      // todo ask mentor is this the only way?
      const type = ingredient as unknown as Ingredients
      if (this.recipe[type] !== this.ingredients[type]) {
        isReady = false
      }
    }
    if (isReady) {
      this.state = UpcomingOrderState.Ready
    }
  }

  public addIngredient = (type: Ingredients) => {
    if (this.ingredients[type] < this.recipe[type]) {
      this.ingredients[type] += 1
    }
    this.checkReadyState()
  }
}

export default UpcomingOrder
