import { TObjectParameter } from './commonTypes'
import { Ingredients } from './ingredients'

export enum Recipes {
  Burger,
}

export type TRecipeParameters = TObjectParameter & {
  recipe: TRecipe
}

export type TRecipeParam = {
  quantity: number
  index: number
}

export type TRecipe = Record<Ingredients, TRecipeParam>
