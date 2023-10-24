export type TPoint = {
  x: number
  y: number
}

export type TObjectParameter = {
  width: number
  height: number
  imageSrc: string
  frameWidth: number
}

export enum GlobalGameState {
  WaitingForStart,
  Loading,
  Started,
  Winned,
  Failed,
}

export type BaseSpriteObjectParams = {
  imageSrc: string
  width: number
  height: number
  frameWidth?: number
  spriteX: number
  spriteY: number
  sWidth: number
  sHeight: number
}

export type BaseSpriteObjectParamsWithPoint = BaseSpriteObjectParams & {
  point: TPoint
}
