import { TPoint } from '../types/commonTypes'
import BaseState from './baseState'

class OrderState extends BaseState {
  public orderState = null

  constructor(point: TPoint) {
    // todo calculate point
    super(point)
  }
}

export default OrderState
