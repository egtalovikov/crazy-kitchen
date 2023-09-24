import Client from '../objects/orders/client'
import CookingZone from '../objects/zones/cookingZone'
import { Clients } from '../types/clients'
import { Ingredients } from '../types/ingredients'
import { Recipes } from '../types/recipe'
import IngredientZone from '../objects/zones/ingredientZone'
import BaseObject from '../objects/base/baseObject'

class GameState {
  public clients: Client[]
  public cookingZones: CookingZone[]
  public ingredientZones: IngredientZone[]
  public draggedObjects: BaseObject[] = []

  constructor() {
    this.clients = this.initClients()
    this.cookingZones = this.initCookingZones()
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

  private initCookingZones = () => {
    // TODO: create several zones
    return [new CookingZone(Recipes.Burger)]
  }

  public resetState = () => {
    // TODO: check
    this.clients = this.initClients()
    this.cookingZones = this.initCookingZones()
    this.ingredientZones = this.initIngredientsZone()
  }
}

export default new GameState()
