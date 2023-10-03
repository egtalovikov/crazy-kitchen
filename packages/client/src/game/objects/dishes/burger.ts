import { TPoint } from '@/game/types/commonTypes'
import { RecipeTypes } from '@/game/types/recipe'
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
    console.log('constructor')
    console.log(this.plate)
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

  public ingredientFits(type: Ingredients) {
    const parentFitsValue = super.ingredientFits(type)
    return parentFitsValue && !(this.isEmpty() && this.recipe[type].index !== 0)
  }

  public addIngredient = (type: Ingredients) => {
    console.log('addIngredient1')
    console.log(this.plate)
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
    console.log('addIngredient2')
    console.log(this.coordinates)
    console.log(this.plate.coordinates)
    console.log(this.plate)
    console.log(this.isHovered)
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

  // TODO: double setting why?
  public setHover(intersects: boolean, ingredient: Ingredient): void {
    /* super.setHover(intersects, ingredient) */
    // TODO: can we use parent method?
    if (intersects && this.ingredientFits(ingredient.type) && !this.isHovered) {
      this.isHovered = true
      this.plate.width = this.plate.width + 20
      this.plate.height = this.plate.height + 20
    } else if (this.isHovered && !intersects) {
      this.removeHover()
    }
  }
}

export default Burger
