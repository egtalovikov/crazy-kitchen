export enum GameLevelList {
  Level1,
  Level2,
}

export type TLevelParams = {
  name: string
  time: number
  // todo may be change to points earned?
  ordersCount: number
  // todo store client - order info here
  // orders: Record<Ingredients, number>[]
}
