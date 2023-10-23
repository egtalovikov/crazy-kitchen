import { TObjectParameter } from './commonTypes'

// todo load assets for different people
export enum Clients {
  Client1,
  Client2,
}

// todo what else we need here
export type TClientParameter = TObjectParameter

// todo better name?
export enum ClientGameState {
  WaitingForStart,
  Moving,
  WaitingForOrder,
  Gone,
}
