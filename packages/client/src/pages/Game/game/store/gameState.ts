import BaseObject from '../objects/baseObject'
import Ingredient from '../objects/ingredient'
import ingredientsParams, { gameParams } from '../parameters/objects'
import { GameObjects, GlobalGameState, Ingredients } from '../types/commonTypes'
import BaseState from './objectState'

class GameState {
  public ingredients: Ingredient[]
  public person: BaseObject
  public bread: BaseObject
  public order: BaseObject
  public burgersFinished = 0
  public globalState: GlobalGameState = GlobalGameState.WaitingForStart

  constructor() {
    this.ingredients = this.initFood()
    this.person = this.initPerson()
    this.bread = this.initBread()
    this.order = this.initOrder()
  }

  private initBread = () => {
    const params = gameParams[GameObjects.BurgerBread]
    const state = new BaseState(params.startPoint)
    // todo params width and height
    return new BaseObject(params.imageSrc, params.size, params.size, state)
  }

  private initPerson = () => {
    const params = gameParams[GameObjects.Person]
    const state = new BaseState(params.startPoint)
    // todo params width and height
    return new BaseObject(params.imageSrc, params.size, params.size, state)
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
    return new BaseObject(params.imageSrc, params.size, params.size, state)
  }

  public resetIngredients = () => {
    this.ingredients.forEach(i => {
      const coords = ingredientsParams[i.type].startPoint
      i.getState().coordinates = coords // todo ref or value
      i.getState().isOnBun = false
    })
  }
}

export default new GameState()
