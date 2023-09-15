export type TPoint = {
  x: number
  y: number
}

export type TGameObjectParameter = {
  size: number
  imageSrc: string
  startPoint: TPoint
}

export enum Ingredients {
  Cheese,
  Salad,
  Cutlet,
  Tomato,
}

export enum GameObjects {
  BurgerBread,
  Plate,
  Person,
  Order,
}

export enum GlobalGameState {
  WaitingForStart,
  Loading,
  Started,
  Finished,
  Failed,
}
