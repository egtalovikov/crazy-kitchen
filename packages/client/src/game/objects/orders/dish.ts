import { topBunParams } from '@/game/parameters/ingredientsOnBurgerParams'
import plateParameters from '@/game/parameters/plateParameters'
import BaseSpriteObject from '../base/baseSpriteObject'
import DishIngredient from '../ingredients/dishIngredient'
import { TPoint } from '@/game/types/commonTypes'
import { Ingredients } from '@/game/types/ingredients'
import { Recipes } from '@/game/types/recipe'

// TODO: create several dishes and burder as descendant
class Dish {
  // todo do we need type here?
  public ingredients: DishIngredient[] = []

  public topBun: BaseSpriteObject

  public plate: BaseSpriteObject

  public coordinates: TPoint

  public startPoint: TPoint

  public isHovered = false

  public type: Recipes

  constructor(type: Recipes, point: TPoint) {
    this.coordinates = point
    this.startPoint = { x: point.x, y: point.y }
    this.plate = this.initPlate()
    this.topBun = this.initTopBun()
    this.type = type
  }

  private initPlate = () => {
    const params = plateParameters
    return new BaseSpriteObject(
      params.imageSrc,
      params.width,
      params.height,
      this.coordinates,
      { spriteX: 0, spriteY: 0, sWidth: params.width, sHeight: params.height }
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

  private calcHeightGap = (orderNumber: number) => {
    return 40 - orderNumber * 20
  }

  public addIngredient = (type: Ingredients) => {
    // TODO: set coordinates

    const ingredientsNumber = this.ingredients.length
    const coords = {
      x: this.coordinates.x + 15,
      y: this.coordinates.y + this.calcHeightGap(ingredientsNumber),
    }

    const ingredient = new DishIngredient(
      type,
      coords,
      this.calcHeightGap(ingredientsNumber)
    )
    this.ingredients.push(ingredient)

    // TODO:
    this.topBun.coordinates = {
      x: this.coordinates.x + 15,
      y: this.coordinates.y + this.calcHeightGap(ingredientsNumber + 1),
    }
  }
  public getObjectsToDraw = (): BaseSpriteObject[] => {
    const objects = []
    if (!this.isEmpty()) {
      // todo plate not drawing?
      objects.push(this.plate)
      this.ingredients.forEach(i => objects.push(i))
      objects.push(this.topBun)
    }
    return objects
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

  public isEmpty = (): boolean => {
    return this.ingredients.length === 0
  }

  public setIngredientCoordinates = (point: TPoint) => {
    // const ingredientsNumber
    this.ingredients.forEach(i => {
      i.coordinates = {
        x: point.x + 15,
        y: point.y + i.heightIndent,
      }
    })
    const ingredientsNumber = this.ingredients.length
    this.topBun.coordinates = {
      x: point.x + 15,
      y: point.y + this.calcHeightGap(ingredientsNumber + 1),
    }
  }

  public backToCookingZone = () => {
    this.setIngredientCoordinates(this.startPoint)
  }
}

export default Dish
