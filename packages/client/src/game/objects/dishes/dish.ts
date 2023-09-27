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
import BaseZone from '../base/baseZone'

// this object should have functionality of drag dish to client

// TODO подумать как отделить общий Dish для напитков и бургеров
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

  public getTargets(): Hoverable[] {
    return gameState.clients
  }

  protected ingredientFits(type: Ingredients): boolean {
    return !!this.recipe[type] && !this.ingredients.some(i => i.type === type)
  }

  public intersects(target: Hoverable): boolean {
    return CollisionHelper.intersectsWithObjectsArr(
      target as unknown as BaseZone,
      this.ingredients
    )
  }

  public setHover(intersects: boolean, object: Draggable): void {
    const ingredient = object as unknown as Ingredient
    if (intersects && this.ingredientFits(ingredient.type) && !this.isHovered) {
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      this.isHovered = false
    }
  }

  public objectFits(object: Draggable): boolean {
    const ingredient = object as unknown as Ingredient
    return this.ingredientFits(ingredient.type)
  }

  public addObject(object: Draggable): void {
    const ingredient = object as unknown as Ingredient
    this.addIngredient(ingredient.type)
  }
}

export default Dish
