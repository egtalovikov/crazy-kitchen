import Painter from '@/game/core/painter'
import BaseSpriteObject from '../base/baseSpriteObject'
import DishIngredient from '../ingredients/dishIngredient'
import { TPoint } from '@/game/types/commonTypes'
import { Ingredients } from '@/game/types/ingredients'
import { Draggable, Hoverable } from '@/game/types/dragInterfaces'
import { RecipeTypes, TRecipe } from '@/game/types/recipe'
import gameState from '@/game/store/gameState'
import Ingredient from '../ingredients/ingredient'
import recipeParameters from '@/game/parameters/recipeParams'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Client from '../orders/client'
import CookingZone from '../zones/cookingZone'
import { Drawable } from '@/game/types/interfaces'

class Dish implements Drawable, Draggable, Hoverable {
  public ingredients: DishIngredient[] = []

  public coordinates: TPoint

  public isHovered = false // TODO: do we need to make it public?

  public type: RecipeTypes

  public recipe: TRecipe

  private isMoving = false

  constructor(type: RecipeTypes, point: TPoint) {
    this.coordinates = { ...point }
    this.type = type
    this.recipe = recipeParameters[type].recipe
  }

  public addIngredient = (type: Ingredients) => {
    const ingredient = new DishIngredient(type, this.coordinates)
    this.ingredients.push(ingredient)
  }

  public isEmpty(): boolean {
    return this.ingredients.length === 0
  }

  protected ingredientFits(type: Ingredients): boolean {
    return !!this.recipe[type] && !this.ingredients.some(i => i.type === type)
  }

  /* drawing methods */
  public getObjectsToDraw(): BaseSpriteObject[] {
    return this.isEmpty() ? [] : this.ingredients
  }
  public draw(painter: Painter): void {
    this.getObjectsToDraw().forEach(object => painter.tempDrawFrame(object))
  }

  /* drag&drop methods */

  public setCoordinates(point: TPoint): void {
    this.ingredients.forEach(i => i.setCoordinates(point))
  }

  public getTargets(): Client[] {
    return gameState.clients
  }

  public intersects(client: Client): boolean {
    return CollisionHelper.intersectsWithObjectsArr(client, this.ingredients)
  }

  public revertToSource(zone: CookingZone): void {
    // TODO: animate revert flying
    //this.setCoordinates(zone.coordinates)
    console.log(zone)
    this.isMoving = true
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

  public update(): void {
    if (this.isMoving) {
      if (this.coordinates.x <= 0) {
        this.isMoving = false
        // todo callback!
      } else {
        this.coordinates.x -= 2
      }
    }
  }
}

export default Dish
