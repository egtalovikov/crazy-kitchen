import { TObjectParameter, TPoint } from './commonTypes'

export enum Ingredients {
  Cheese,
  Salad,
  Cutlet,
  Tomato,
  Bread,
}
export type TIngredientParameter = TObjectParameter & {
  startPoint: TPoint
  preparationRequired: boolean
}
