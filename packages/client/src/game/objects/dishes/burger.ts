import { TPoint } from '@/game/types/commonTypes'
import { Recipes } from '@/game/types/recipe'
import BaseSpriteObject from '../base/baseSpriteObject'
import plateParameters from '@/game/parameters/plateParameters'
import { topBunParams } from '@/game/parameters/ingredientsOnBurgerParams'
import { Ingredients } from '@/game/types/ingredients'
import BurgerIngredient from '../ingredients/burgerIngredient'
import Ingredient from '../ingredients/ingredient'
import Dish from './dish'

class Burger extends Dish {
  public topBun: BaseSpriteObject

  public plate: BaseSpriteObject

  // TODO: is it ok to override like that?
  public ingredients: BurgerIngredient[] = []

  constructor(point: TPoint) {
    super(Recipes.Burger, point)
    this.plate = new BaseSpriteObject({
      ...plateParameters,
      point: this.coordinates,
    })
    this.topBun = new BaseSpriteObject({
      ...topBunParams,
      point: this.coordinates,
    })
  }

  private calcHeightIndent = (orderNumber: number) => {
    return 40 - orderNumber * 20 // TODO: calculate values
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
        ingredient.setIndent(this.calcHeightIndent(i))
        ingredient.coordinates = {
          x: this.coordinates.x + 15,
          y: this.coordinates.y + this.calcHeightIndent(i),
        }
      })

    const ingredientsNumber = this.ingredients.length

    this.topBun.coordinates = {
      x: this.coordinates.x + 15,
      y: this.coordinates.y + this.calcHeightIndent(ingredientsNumber + 1),
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

  /* drag&drop logic */

  public setCoordinates(point: TPoint) {
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
      y: point.y + this.calcHeightIndent(ingredientsNumber + 1),
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
