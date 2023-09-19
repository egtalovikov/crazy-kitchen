import plateParameters from '../parameters/plateParameters'
import BaseState from '../store/baseState'
import { Recipes } from '../types/recipe'
import Plate from './table'
import UpcomingOrder from './upcomingOrder'

class CookingZone {
  // todo will draw plate and upcoming order for each zone
  public plate: Plate
  public upcomingOrder: UpcomingOrder

  // todo create logic to change zone image when adding ingredient

  constructor(type: Recipes) {
    this.plate = this.initPlate()
    this.upcomingOrder = new UpcomingOrder(type)
  }

  private initPlate = () => {
    const params = plateParameters
    const state = new BaseState(params.startPoint)
    return new Plate(params.imageSrc, params.width, params.height, state)
  }
}

export default CookingZone
