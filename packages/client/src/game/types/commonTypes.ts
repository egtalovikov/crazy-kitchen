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
