import set from '@assets/ingredients/test/burgerSet.png'
import { Ingredients } from '../types/ingredients'

const ingredientsOnBurgerParams = {
  [Ingredients.Salad]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 1170,
    spriteY: 208,
    spriteWidth: 220,
    spriteHeight: 90,
    // frameWidth: 100,
    //startPoint: { x: 1335, y: 750 },
    //preparationRequired: false,
  },
  [Ingredients.Cutlet]: {
    width: 220,
    height: 90,
    imageSrc: set,
    spriteX: 365,
    spriteY: 100,
    spriteWidth: 220,
    spriteHeight: 90,
    // frameWidth: 100,
    //startPoint: { x: 1200, y: 750 },
    //preparationRequired: true,
  },
  [Ingredients.Tomato]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 920,
    spriteY: 100,
    spriteWidth: 220,
    spriteHeight: 90,
    // frameWidth: 100,
    //startPoint: { x: 1200, y: 650 },
    //preparationRequired: false,
  },
  [Ingredients.Bread]: {
    width: 120,
    height: 50,
    imageSrc: set,
    spriteX: 85,
    spriteY: 520,
    spriteWidth: 240,
    spriteHeight: 100,
    // frameWidth: 100,
    //startPoint: { x: 800, y: 730 },
    //preparationRequired: false,
  },
  // todo bread top
  /* [Ingredients.Bread]: {
    width: 220,
    height: 90,
    imageSrc: set,
    frameWidth: 100,
    startPoint: { x: 800, y: 730 },
    preparationRequired: false,
  }, */
}

export default ingredientsOnBurgerParams

export const topBunParams = {
  width: 120,
  height: 50,
  imageSrc: set,
  spriteX: 85,
  spriteY: 75,
  spriteWidth: 240,
  spriteHeight: 100,
}
