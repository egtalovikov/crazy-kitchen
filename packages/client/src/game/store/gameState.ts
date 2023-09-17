import BaseObject from '../objects/baseObject'
import Ingredient from '../objects/ingredient'
import { gameParams } from '../parameters/objectsParams'
import { GameObjects, Ingredients } from '../types/commonTypes'
import BaseState from './objectState'

class GameState {
  public ingredients: Ingredient[]
  public person: BaseObject
  public bread: BaseObject
  public order: BaseObject

  constructor() {
    this.ingredients = this.initFood()
    this.person = this.initPerson()
    this.bread = this.initBread()
    this.order = this.initOrder()
  }

  private initBread = () => {
    const params = gameParams[GameObjects.BurgerBread]
    const state = new BaseState(params.startPoint)
    return new BaseObject(params.imageSrc, params.width, params.height, state)
  }

  private initPerson = () => {
    const params = gameParams[GameObjects.Person]
    const state = new BaseState(params.startPoint)
    return new BaseObject(params.imageSrc, params.width, params.height, state)
  }

  private initFood = () => {
    const food: Ingredient[] = []
    food.push(new Ingredient(Ingredients.Cheese))
    food.push(new Ingredient(Ingredients.Cutlet))
    food.push(new Ingredient(Ingredients.Salad))
    food.push(new Ingredient(Ingredients.Tomato))

    return food
  }

  private initOrder = () => {
    const params = gameParams[GameObjects.Order]
    const state = new BaseState(params.startPoint)
    // todo params width and height
    return new BaseObject(params.imageSrc, params.width, params.height, state)
  }

  public resetIngredients = () => {
    /* this.ingredients.forEach(i => {
      const coords = ingredientsParams[i.type].startPoint
      i.getState().coordinates = coords // todo ref or value
      i.getState().isOnBun = false
    }) */
    this.ingredients = this.initFood()
  }

  // not sure it is the best way - may be has default number of ingredients + list + objects?
  public addIngredient = (type: Ingredients) => {
    this.ingredients.push(new Ingredient(type))
  }

  // todo use this
  public resetState = () => this.resetIngredients()
}

export default new GameState()
