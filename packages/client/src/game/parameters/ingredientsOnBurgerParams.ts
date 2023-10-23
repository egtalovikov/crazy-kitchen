import set from '@assets/ingredients/test/burgerSet.png'
import { Ingredients } from '../types/ingredients'
import { BaseSpriteObjectParams } from '../types/commonTypes'

const ingredientsOnBurgerParams: Record<Ingredients, BaseSpriteObjectParams> = {
  [Ingredients.Salad]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 1170,
    spriteY: 208,
    sWidth: 220,
    sHeight: 90,
  },
  [Ingredients.Cutlet]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 365,
    spriteY: 100,
    sWidth: 220,
    sHeight: 90,
  },
  [Ingredients.Tomato]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 920,
    spriteY: 100,
    sWidth: 220,
    sHeight: 90,
  },
  [Ingredients.Bread]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 85,
    spriteY: 520,
    sWidth: 240,
    sHeight: 100,
  },
}

export default ingredientsOnBurgerParams

export const topBunParams: BaseSpriteObjectParams = {
  width: 120,
  height: 50,
  imageSrc: set,
  spriteX: 85,
  spriteY: 75,
  sWidth: 240,
  sHeight: 100,
}
