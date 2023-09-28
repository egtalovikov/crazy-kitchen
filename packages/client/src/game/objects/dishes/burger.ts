import { TPoint } from '@/game/types/commonTypes'
import { Recipes } from '@/game/types/recipe'
import BaseSpriteObject from '../base/baseSpriteObject'
import plateParameters from '@/game/parameters/plateParameters'
import { topBunParams } from '@/game/parameters/ingredientsOnBurgerParams'
import { Ingredients } from '@/game/types/ingredients'
import ComposedDish from './composedDish'
import BurgerIngredient from '../ingredients/burgerIngredient'
import Ingredient from '../ingredients/ingredient'

class Burger extends ComposedDish {
  public topBun: BaseSpriteObject

  public plate: BaseSpriteObject

  // how to override properly?
  public ingredients: BurgerIngredient[] = []

  constructor(point: TPoint) {
    super(Recipes.Burger, point)
    this.plate = this.initPlate()
    this.topBun = this.initTopBun()
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

  public ingredientFits(type: Ingredients) {
    const parentFitsValue = super.ingredientFits(type)
    return parentFitsValue && !(this.isEmpty() && this.recipe[type].index !== 0)
  }

  public addIngredient = (type: Ingredients) => {
    this.ingredients.push(new BurgerIngredient(type, this.coordinates, 0))

    // sort ingredients by index, so that the smallest index means the first ingredient on the bun
    this.ingredients
      .sort((a, b) => {
        return this.recipe[a.type].index - this.recipe[b.type].index
      })
      .forEach((ingredient, i) => {
        ingredient.setIndent(this.calcHeightGap(i))
        ingredient.coordinates = {
          x: this.coordinates.x + 15,
          y: this.coordinates.y + this.calcHeightGap(i),
        }
      })

    const ingredientsNumber = this.ingredients.length

    this.topBun.coordinates = {
      x: this.coordinates.x + 15,
      y: this.coordinates.y + this.calcHeightGap(ingredientsNumber + 1),
    }
  }

  public getObjectsToDraw() {
    const result = []

    if (!this.isEmpty()) {
      result.push(this.plate)
      result.push(...super.getObjectsToDraw())
      result.push(this.topBun)
    }

    return result
  }

  public setIngredientCoordinates = (point: TPoint) => {
    this.ingredients.forEach(i => {
      const ingredient = i as BurgerIngredient
      ingredient.coordinates = {
        x: point.x + 15,
        y: point.y + ingredient.heightIndent,
      }
    })
    const ingredientsNumber = this.ingredients.length
    this.topBun.coordinates = {
      x: point.x + 15,
      y: point.y + this.calcHeightGap(ingredientsNumber + 1),
    }
  }

  public setHover(intersects: boolean, ingredient: Ingredient): void {
    super.setHover(intersects, ingredient)
    if (this.isHovered) {
      this.plate.width = this.plate.width + 20
      this.plate.height = this.plate.height + 20
    } else {
      this.plate.width = this.plate.width - 20
      this.plate.height = this.plate.height - 20
    }
  }
}

export default Burger
