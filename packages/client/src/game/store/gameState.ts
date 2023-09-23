import Client from '../objects/client'
import CookingZone from '../objects/zone/cookingZone'
import Ingredient from '../objects/ingredient'
import { Clients } from '../types/clients'
import { Ingredients } from '../types/ingredients'
import { Recipes } from '../types/recipe'
import IngredientZone from '../objects/zone/ingredientZone'

class GameState {
  // public ingredients: Ingredient[]
  // public upcomingOrders: Order[]
  public clients: Client[]
  public cookingZones: CookingZone[]
  public ingredientZones: IngredientZone[]

  public draggedObjects: Ingredient[] = []

  constructor() {
    // this.ingredients = this.initIngredients()
    //this.upcomingOrders = []
    this.clients = this.initClients()
    // TODO: create several zones
    this.cookingZones = [new CookingZone(Recipes.Burger)]
    this.ingredientZones = this.initIngredientsZone()
  }

  private initClients = (): Client[] => {
    const clients = []
    clients.push(new Client(Clients.Client1, [Recipes.Burger]))
    return clients
  }

  private initIngredients = () => {
    const food: Ingredient[] = []
    Object.keys(Ingredients).forEach(ingredient => {
      if (!isNaN(Number(ingredient))) {
        food.push(new Ingredient(Number(ingredient)))
      }
    })
    return food
  }

  private initIngredientsZone = (): IngredientZone[] => {
    const zones = []
    zones.push(new IngredientZone(Ingredients.Tomato))
    return zones
  }

  public resetState = () => {
    // todo here we will reset game on start
  }
}

export default new GameState()
