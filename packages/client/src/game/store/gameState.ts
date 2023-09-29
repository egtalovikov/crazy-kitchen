import Client from '../objects/orders/client'
import CookingZone from '../objects/zones/cookingZone'
import { Clients } from '../types/clients'
import { Ingredients } from '../types/ingredients'
import { BurgerTypes } from '../types/recipe'
import IngredientZone from '../objects/zones/ingredientZone'
import BurgerZone from '../objects/zones/burgerZone'
import GameLevels from '../parameters/levelParams'
import { GameLevelList } from '../types/levels'

const firstLevel = GameLevels[GameLevelList.Level1]
export class GameState {
  public clients: Client[]

  public cookingZones: CookingZone[]

  public ingredientZones: IngredientZone[]

  public score = 0

  public currentLevel = firstLevel

  public remainingTime = firstLevel.time

  constructor() {
    this.clients = this.initClients()
    this.cookingZones = this.initCookingZones()
    this.ingredientZones = this.initIngredientsZone()
  }

  private initClients = (): Client[] => {
    const clients = []
    clients.push(
      new Client(Clients.Client1, [BurgerTypes.WithTomato, BurgerTypes.Total])
    )
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
    return [new BurgerZone()]
  }

  public resetState = () => {
    // TODO: check
    this.clients = this.initClients()
    this.cookingZones = this.initCookingZones()
    this.ingredientZones = this.initIngredientsZone()
  }
}

export default new GameState()
