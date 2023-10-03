import Painter from '@/game/core/painter'
import BaseSpriteObject from '../base/baseSpriteObject'
import DishIngredient from '../ingredients/dishIngredient'
import { TPoint } from '@/game/types/commonTypes'
import { Ingredients } from '@/game/types/ingredients'
import { Draggable, Hoverable } from '@/game/types/dragTypes'
import { RecipeTypes, TRecipe } from '@/game/types/recipe'
import gameState from '@/game/store/gameState'
import Ingredient from '../ingredients/ingredient'
import recipeParameters from '@/game/parameters/recipeParams'
import CollisionHelper from '@/game/helpers/collisionHelper'
import Client from '../orders/client'
import Trajectory from '../trajectory/trajectory'
import engine from '@/game/core/engine'
import CookingZone from '../zones/cookingZone'

class Dish implements Draggable, Hoverable {
  public ingredients: DishIngredient[] = []

  public coordinates: TPoint

  public isHovered = false // TODO: do we need to make it public? interface vs private

  public type: RecipeTypes

  public recipe: TRecipe

  /* revert to zone moving logic */
  // TODO: same as isHovered, do we need to make a public contract for trajectory for Draggable?
  private trajectory: Trajectory | null = null

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
    this.coordinates = { ...point } // todo do we need copy here
  }

  public getTargets(): Client[] {
    return gameState.clients
  }

  public intersects(client: Client): boolean {
    return CollisionHelper.intersectsWithObjectsArr(client, this.ingredients)
  }

  public revertToSource(source: CookingZone, callback: () => void): void {
    this.trajectory = new Trajectory(
      this.coordinates,
      source.coordinates,
      engine.getMainLoopIndex(),
      callback
    )
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

  public update(time: number): void {
    if (this.trajectory) {
      if (!this.trajectory.isPathEnded()) {
        this.setCoordinates(this.trajectory.getCurrentPoint(time))
      } else {
        this.trajectory.movingEndFn()
      }
    }
  }
}

export default Dish
