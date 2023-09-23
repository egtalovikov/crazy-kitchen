import plateParameters from '../../parameters/plateParameters'
import { Recipes, TRecipe } from '../../types/recipe'
import BaseObject from '../base/baseObject'
import BaseZone from '../base/baseZone'
import Ingredient from '../ingredient'
import { Ingredients } from '../../types/ingredients'
import recipeParameters from '../../parameters/recipeParams'
import zoneParams from '../../parameters/zoneParameters'

class CookingZone extends BaseZone {
  public plate: BaseObject
  public isEmpty = true // TODO: will be draggable if false
  public recipe: TRecipe // TODO: is record the best solution?
  // TODO: we do not need ingredient logic here, use BaseObject or it's descendant
  public dish: Ingredient[] = [] // TODO: bun top separate logic
  public type: Recipes // compare when dragging to client

  private isHovered = false // TODO: check hovered logic

  public isDragging = false // TODO: check hovered logic

  constructor(type: Recipes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    this.plate = this.initPlate()
    this.recipe = recipeParameters[type].recipe
    this.type = type
  }

  private initPlate = () => {
    const params = plateParameters
    return new BaseObject(
      params.imageSrc,
      params.width,
      params.height,
      params.frameWidth,
      this.coordinates
    )
  }

  public isDraggable = () => !this.isEmpty

  public getObjectsToDraw = (): BaseObject[] => {
    //console.log('getObjectsToDraw')
    const objects = []
    if (!this.isEmpty) {
      objects.push(this.plate)
      objects.concat(this.dish)
    }
    return objects
  }

  public ingredientFits = (type: Ingredients): boolean => {
    return !!this.recipe[type] && this.dish.every(i => i.type !== type)
  }

  public addIngredient = (type: Ingredients) => {
    // check if is in recipe
    // TODO: is this the best way, may be recipe should not contain all ingredients?
    if (this.ingredientFits(type)) {
      // TODO: set coordinates
      const ingredient = new Ingredient(type)
      ingredient.setCoordinates(this.coordinates)
      this.dish.push(ingredient)
      this.isEmpty = false
      console.log('zone ingredients')
      console.log(this.dish)
      console.log('zone coords')
      console.log(this.coordinates)
    }
  }

  public getIsHovered = () => this.isHovered

  public setIsHovered = (isHovered: boolean) => {
    this.isHovered = isHovered
    // TODO: avoid double calls! remove 20 number
    if (isHovered) {
      this.plate.width = this.plate.width + 20
      this.plate.height = this.plate.height + 20
    } else {
      this.plate.width = this.plate.width - 20
      this.plate.height = this.plate.height - 20
    }
  }

  public setHovered = (itersects: boolean, type: Ingredients) => {
    if (itersects && this.ingredientFits(type) && !this.getIsHovered()) {
      this.setIsHovered(true)
    } else if (this.getIsHovered() && !itersects) {
      this.setIsHovered(false)
    }
  }
}

export default CookingZone
