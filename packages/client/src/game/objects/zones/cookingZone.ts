import { Recipes } from '../../types/recipe'
import BaseZone from '../base/baseZone'
import zoneParams from '../../parameters/zoneParameters'
import Dish from '../dishes/dish'
import { DragSource, Draggable, Drawable } from '@/game/types/dragInterfaces'
import Painter from '@/game/core/painter'

// TODO: зона не должна знать ничего про блюдо, она только кликается и стартует драг
// и знает пустая она или нет, что-то еще нужно?

// TODO: рецепт должен знать какой ингредиент подходит, какой идет первым

// TODO: добавление ингредиента это ответственность блюда, блюдо знает про рецепт чтобы правильно добавлять
class CookingZone extends BaseZone implements Drawable, DragSource {
  //public recipe: TRecipe // TODO: is record the best solution?
  protected dish: Dish
  private type: Recipes

  constructor(type: Recipes) {
    const params = zoneParams
    super(params.width, params.height, params.coordinates)
    //this.recipe = recipeParameters[type].recipe
    this.dish = new Dish(type, this.coordinates)
    this.type = type
  }

  public isEmpty = (): boolean => this.dish.isEmpty()

  public getObjectToDraw = () => this.dish.getObjectsToDraw()

  public resetDish = () => {
    this.dish = new Dish(this.type, this.coordinates)
  }

  public draw(painter: Painter): void {
    painter.tempDrawZone(this) // temp for testing, remove
    if (!this.isEmpty()) {
      this.getObjectToDraw().forEach(object => painter.tempDrawFrame(object))
    }
  }

  public getDish = (): Dish => this.dish

  public getDraggable(): Draggable | null {
    return !this.dish.isEmpty() ? this.dish : null
  }

  public reset() {
    this.dish = new Dish(this.type, this.coordinates)
  }
}

export default CookingZone
