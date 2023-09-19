import Client from '../objects/client'
import CookingZone from '../objects/cookingZone'
import Ingredient from '../objects/ingredient'
import Order from '../objects/order'
import { Clients } from '../types/clients'
import { Ingredients } from '../types/ingredients'
import { Recipes } from '../types/recipe'

class GameState {
  public ingredients: Ingredient[]
  public upcomingOrders: Order[]
  public clients: Client[]
  // todo create several zones
  public cookingZone: CookingZone

  constructor() {
    this.ingredients = this.initIngredients()
    this.upcomingOrders = []
    this.clients = this.initClients()
    // todo create several zones
    this.cookingZone = new CookingZone(Recipes.Burger)
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

  public resetState = () => {
    // todo here we will reset game on start
  }
}

export default new GameState()
