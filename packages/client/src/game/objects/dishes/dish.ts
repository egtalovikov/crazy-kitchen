import Painter from '@/game/core/painter'
import BaseSpriteObject from '../base/baseSpriteObject'
import DishIngredient from '../ingredients/dishIngredient'
import { TPoint } from '@/game/types/commonTypes'
import { Ingredients } from '@/game/types/ingredients'
import { Draggable, Drawable, Hoverable } from '@/game/types/dragInterfaces'
import { Recipes, TRecipe } from '@/game/types/recipe'
import gameState from '@/game/store/gameState'
import Ingredient from '../ingredients/ingredient'
import recipeParameters from '@/game/parameters/recipeParams'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Client from '../orders/client'

// this object should have functionality of drag dish to client

// TODO: how we can split logic for drinks and burgers
class Dish implements Drawable, Draggable, Hoverable {
  public ingredients: DishIngredient[] = []

  public coordinates: TPoint

  public startPoint: TPoint // needed to revert to cooking zone, can we store ref to it somehow?

  public isHovered = false

  public type: Recipes

  public recipe: TRecipe

  constructor(type: Recipes, point: TPoint) {
    this.coordinates = point
    this.startPoint = { x: point.x, y: point.y }
    this.type = type
    this.recipe = recipeParameters[type].recipe
  }

  public addIngredient = (type: Ingredients) => {
    console.log('in dish add ingredient')
    const ingredient = new DishIngredient(type, {
      x: this.coordinates.x,
      y: this.coordinates.y,
    })
    this.ingredients.push(ingredient)
  }

  public getObjectsToDraw(): BaseSpriteObject[] {
    return this.isEmpty() ? [] : this.ingredients
  }

  public isEmpty = (): boolean => {
    return this.ingredients.length === 0
  }

  public setIngredientCoordinates = (point: TPoint) => {
    this.ingredients.forEach(i => {
      i.coordinates = {
        x: point.x,
        y: point.y,
      }
    })
  }

  public draw(painter: Painter): void {
    this.ingredients.forEach(object => painter.tempDrawFrame(object))
  }

  public setCoordinates(point: TPoint): void {
    this.setIngredientCoordinates(point)
  }

  public revertToSource(): void {
    // TODO: полет назад на зону и установка обратно в нее ?
    this.setIngredientCoordinates(this.startPoint)
  }

  public getTargets(): Client[] {
    return gameState.clients
  }

  protected ingredientFits(type: Ingredients): boolean {
    return !!this.recipe[type] && !this.ingredients.some(i => i.type === type)
  }

  public intersects(client: Client): boolean {
    return CollisionHelper.intersectsWithObjectsArr(client, this.ingredients)
  }

  public setHover(intersects: boolean, ingredient: Ingredient): void {
    if (intersects && this.ingredientFits(ingredient.type) && !this.isHovered) {
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      this.isHovered = false
    }
  }

  public objectFits(ingredient: Ingredient): boolean {
    return this.ingredientFits(ingredient.type)
  }

  public addObject(ingredient: Ingredient): void {
    this.addIngredient(ingredient.type)
  }
}

export default Dish
