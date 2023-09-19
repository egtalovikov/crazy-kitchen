import { TObjectParameter } from './commonTypes'
import { Ingredients } from './ingredients'

export enum Recipes {
  Burger,
}

export type TRecipeParameters = TObjectParameter & {
  recipe: Record<Ingredients, number>
}

export type TRecipe = Record<Ingredients, number>

// todo is the best place here?
export const emptyOrder = {
  [Ingredients.Bread]: 0,
  [Ingredients.Cheese]: 0,
  [Ingredients.Cutlet]: 0,
  [Ingredients.Salad]: 0,
  [Ingredients.Tomato]: 0,
}
