import Painter from '@/game/core/painter'
import BaseSpriteObject from '../base/baseSpriteObject'
import DishIngredient from '../ingredients/dishIngredient'
import { TPoint } from '@gameTypes/commonTypes'
import { Ingredients } from '@gameTypes/ingredients'
import { Draggable, Hoverable } from '@gameTypes/dragTypes'
import { RecipeTypes, TRecipe } from '@gameTypes/recipe'
import gameState from '@game/store/gameState'
import Ingredient from '../ingredients/ingredient'
import recipeParameters from '@gameParams/recipeParams'
import CollisionHelper from '@game/helpers/collisionHelper'
import Client from '../orders/client'
import Trajectory from '../trajectory/trajectory'
import engine from '@game/core/engine'
import CookingZone from '../zones/cookingZone'

class Dish implements Draggable, Hoverable {
  protected coordinates: TPoint

  public ingredients: DishIngredient[] = []

  public type: RecipeTypes

  public recipe: TRecipe

  // TODO: do we need to make it public? interface vs private
  public isHovered = false

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

  /* drawing methods */
  public getObjectsToDraw(): BaseSpriteObject[] {
    return this.isEmpty() ? [] : this.ingredients
  }
  public draw(painter: Painter): void {
    this.getObjectsToDraw().forEach(object => painter.tempDrawFrame(object))
  }

  /* drag&drop methods */

  /* Draggable */

  public getTargets(): Client[] {
    return gameState.clients
  }

  public intersects(client: Client): boolean {
    return CollisionHelper.intersectsWithObjectsArr(client, this.ingredients)
  }

  // these 3 methods are not specific to Dish and can be reused in Ingredients
  // if we make common parent with coordinates
  public setCoordinates(point: TPoint): void {
    this.coordinates = { ...point } // TODO: do we need copy here
  }

  public revertToSource(source: CookingZone, callback: () => void): void {
    this.trajectory = new Trajectory(
      this.coordinates,
      source.coordinates,
      engine.getMainLoopIndex(),
      callback
    )
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

  /* Hoverable */

  public objectFits(ingredient: Ingredient): boolean {
    const type = ingredient.type
    return !!this.recipe[type] && !this.ingredients.some(i => i.type === type)
  }

  public setHover(intersects: boolean, ingredient: Ingredient): void {
    if (intersects && this.objectFits(ingredient) && !this.isHovered) {
      this.isHovered = true
    } else if (this.isHovered && !intersects) {
      this.isHovered = false
    }
  }

  public addObject(ingredient: Ingredient): void {
    this.addIngredient(ingredient.type)
  }
}

export default Dish
