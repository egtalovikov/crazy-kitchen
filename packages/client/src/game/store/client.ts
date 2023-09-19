import { ClientGameState } from '../types/clients'
import { TPoint } from '../types/commonTypes'
import BaseState from './baseState'

class ClientState extends BaseState {
  public gameState = ClientGameState.WaitingForStart

  constructor(coordinates: TPoint) {
    super(coordinates)
  }
}

export default ClientState
