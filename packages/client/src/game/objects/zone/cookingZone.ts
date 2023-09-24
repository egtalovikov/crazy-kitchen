import plateParameters from '../../parameters/plateParameters'
import { Recipes, TRecipe } from '../../types/recipe'
import BaseObject from '../base/baseObject'
import BaseZone from '../base/baseZone'
import { Ingredients } from '../../types/ingredients'
import recipeParameters from '../../parameters/recipeParams'
import zoneParams from '../../parameters/zoneParameters'
import DishIngredient from '../ingredients/dishIngredient'
import BaseSpriteObject from '../base/baseSpriteObject'
import { topBunParams } from '@/game/parameters/ingredientsOnBurgerParams'

class CookingZone extends BaseZone {
  // TODO: plate and bun top can we refactor?
  public topBun: BaseSpriteObject
  public plate: BaseObject
  public isEmpty = true // TODO: will be draggable if false
  public recipe: TRecipe // TODO: is record the best solution?
  // TODO: we do not need ingredient logic here, use BaseObject or it's descendant
  public dish: DishIngredient[] = [] // TODO: bun top separate logic
  public type: Recipes // compare when dragging to client

  private isHovered = false // TODO: check hovered logic

  public isDragging = false // TODO: check hovered logic

  constructor(type: Recipes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    this.plate = this.initPlate()
    this.topBun = this.initTopBun()
    this.recipe = recipeParameters[type].recipe
    this.type = type
  }

  private initPlate = () => {
    const params = plateParameters
    return new BaseObject(
      params.imageSrc,
      params.width,
      params.height,
      this.coordinates
    )
  }

  private initTopBun = () => {
    const params = topBunParams
    const topBun = new BaseSpriteObject(
      params.imageSrc,
      params.width,
      params.height,
      this.coordinates,
      params
    )
    return topBun
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
    // TODO: refactor this logic
    if (this.isEmpty && type !== Ingredients.Bread) {
      return false // we can put only bread on empty zone
    }
    return !!this.recipe[type] && this.dish.every(i => i.type !== type)
  }

  private calcHeightGap = (orderNumber: number) => {
    return 40 - orderNumber * 20
  }

  public addIngredient = (type: Ingredients) => {
    // check if is in recipe
    // TODO: is this the best way, may be recipe should not contain all ingredients?
    if (this.ingredientFits(type)) {
      // TODO: set coordinates
      /* const ingredient = new Ingredient(type)
      ingredient.setCoordinates(this.coordinates)
      this.dish.push(ingredient)
      this.isEmpty = false
      console.log('zone ingredients')
      console.log(this.dish)
      console.log('zone coords')
      console.log(this.coordinates) */

      const ingredientsNumber = this.dish.length
      const coords = {
        x: this.coordinates.x + 15,
        y: this.coordinates.y + this.calcHeightGap(ingredientsNumber),
      }

      const ingredient = new DishIngredient(
        type,
        coords,
        this.calcHeightGap(ingredientsNumber)
      )
      this.dish.push(ingredient)
      this.isEmpty = false

      // todo
      this.topBun.coordinates = {
        x: this.coordinates.x + 15,
        y: this.coordinates.y + this.calcHeightGap(ingredientsNumber + 1),
      }
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
