import { TPoint } from '@gameTypes/commonTypes'
import { RecipeTypes } from '@gameTypes/recipe'
import BaseSpriteObject from '../base/baseSpriteObject'
import plateParameters from '@gameParams/plateParameters'
import { topBunParams } from '@gameParams/ingredientsOnBurgerParams'
import { Ingredients } from '@gameTypes/ingredients'
import BurgerIngredient from '../ingredients/burgerIngredient'
import Ingredient from '../ingredients/ingredient'
import Dish from './dish'

class Burger extends Dish {
  public topBun: BaseSpriteObject

  public plate: BaseSpriteObject

  // TODO: is it ok to override like that?
  public ingredients: BurgerIngredient[] = []

  private INGREDIENT_INDENT = 15

  constructor(point: TPoint) {
    super(RecipeTypes.Burger, point)
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

  private removeHover = () => {
    this.isHovered = false
    this.plate.width = this.plate.width - 20
    this.plate.height = this.plate.height - 20
  }

  /* public methods */

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
    this.removeHover()
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
    super.setCoordinates(point)
    this.ingredients.forEach(i =>
      i.setCoordinates(point, this.INGREDIENT_INDENT)
    )
    const ingredientsNumber = this.ingredients.length
    this.topBun.coordinates = {
      x: point.x + this.INGREDIENT_INDENT,
      y: point.y + this.calcHeightIndent(ingredientsNumber + 1),
    }
  }

  public objectFits(ingredient: Ingredient) {
    const parentFitsValue = super.objectFits(ingredient)
    return (
      parentFitsValue &&
      !(this.isEmpty() && this.recipe[ingredient.type].index !== 0)
    )
  }

  // TODO: double setting why?
  public setHover(intersects: boolean, ingredient: Ingredient): void {
    /* super.setHover(intersects, ingredient) */
    // TODO: can we use parent method?
    if (intersects && this.objectFits(ingredient) && !this.isHovered) {
      this.isHovered = true
      this.plate.width = this.plate.width + 20
      this.plate.height = this.plate.height + 20
    } else if (this.isHovered && !intersects) {
      this.removeHover()
    }
  }
}

export default Burger
