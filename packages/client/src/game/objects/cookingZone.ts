import plateParameters from '../parameters/plateParameters'

import { Recipes } from '../types/recipe'
import BaseObject from './base/baseObject'
import UpcomingOrder from './upcomingOrder'
import BaseZone from './base/baseZone'

class CookingZone extends BaseZone {
  // todo will draw plate and upcoming order for each zone
  // TODO: ingredients to paint with top bun and with plate in one base object array??
  public plate: BaseObject
  public upcomingOrder: UpcomingOrder

  // todo create logic to change zone image when adding ingredient

  constructor(type: Recipes) {
    const params = plateParameters
    super(params.width, params.height, params.startPoint)
    this.plate = this.initPlate()
    this.upcomingOrder = new UpcomingOrder(type, plateParameters.startPoint)
  }

  private initPlate = () => {
    const params = plateParameters
    return new BaseObject(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      params.startPoint
    )
  }

  public isDraggable = () => !this.upcomingOrder.isEmpty

  public getObjectsToDraw = (): BaseObject[] => {
    //console.log('getObjectsToDraw')
    const objects = []
    objects.push(this.plate)
    objects.concat(this.upcomingOrder.ingredientsToPaint)
    //console.log(objects)
    return objects
  }
}

export default CookingZone
