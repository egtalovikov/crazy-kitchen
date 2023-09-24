import { TObjectParameter, TPoint } from './commonTypes'

export enum Ingredients {
  // Cheese, // 0
  Salad, // 1
  Cutlet, // 2
  Tomato, // 3
  Bread, // 4
}

export type TIngredientParameter = TObjectParameter & {
  startPoint: TPoint
  preparationRequired: boolean
}
