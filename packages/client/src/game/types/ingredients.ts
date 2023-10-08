import { TObjectParameter } from './commonTypes'

// TODO: rename with BurgerIngredients???
export enum Ingredients {
  Salad,
  Cutlet,
  Tomato,
  Bread,
}

export type TIngredientParameter = TObjectParameter & {
  preparationRequired: boolean
}
