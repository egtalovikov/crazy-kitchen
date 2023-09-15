export type TPoint = {
  x: number
  y: number
}

export type TGameObjectParameter = {
  width: number
  height: number
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
  Winned,
  Failed,
}

export enum GameLevelList {
  Level1,
  Level2,
}

export type TLevelParams = {
  name: string
  time: number
  ordersCount: number
  orders: null // todo set burger params here
}
