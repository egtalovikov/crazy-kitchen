import { TObjectParameter } from './commonTypes'
import { Ingredients } from './ingredients'

// recipe types e.g. burger, hotdog, etc.
export enum RecipeTypes {
  Burger,
}

export enum BurgerTypes {
  Simple,
  WithTomato,
  WithSalad,
  Total,
}

export type TRecipeParameters = TObjectParameter & {
  recipe: TRecipe
}

export type TRecipeParam = {
  quantity: number
  index: number
}

export type TRecipe = Record<Ingredients, TRecipeParam>
