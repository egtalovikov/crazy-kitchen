import Client from '../objects/client'
import CookingZone from '../objects/zone/cookingZone'
import Ingredient from '../objects/ingredients/ingredient'
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

  private initIngredientsZone = (): IngredientZone[] => {
    const zones: IngredientZone[] = []
    Object.values(Ingredients).forEach(type => {
      if (!isNaN(Number(type))) {
        console.log('type')
        console.log(type)
        const zone = new IngredientZone(type as unknown as Ingredients)
        zones.push(zone)
      }
    })
    return zones
  }

  public resetState = () => {
    // todo here we will reset game on start
  }
}

export default new GameState()
