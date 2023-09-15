import saladImage from '@assets/ingredients/salad.png'
import plateImage from '@assets/plate.png'
import burgerBread from '@assets/ingredients/burgerBread.png'
import personImage from '@assets/person.png'
import cutletImage from '@assets/ingredients/cutlet.png'
import cheeseImage from '@assets/ingredients/cheese.png'
import tomato from '@assets/ingredients/tomato.png'
import totalBurgerImage from '@assets/ingredients/totalBurger.png'
import burgerTomatoSaladImage from '@assets/ingredients/burgerTomatoSalad.png'
import burgerCheeseSaladImage from '@assets/ingredients/burgerCheeseSalad.png'
// import backgroundImage from '@assets/startBackground.png'
import backgroundImage from '@assets/mainBackground.png'
import {
  GameObjects,
  Ingredients,
  TGameObjectParameter,
} from '../types/commonTypes'

const ingredientsParams: Record<Ingredients, TGameObjectParameter> = {
  [Ingredients.Cheese]: {
    size: 100,
    imageSrc: cheeseImage,
    startPoint: { x: 1225, y: 500 },
  },
  [Ingredients.Salad]: {
    size: 100,
    imageSrc: saladImage,
    startPoint: { x: 1225, y: 600 },
  },
  [Ingredients.Cutlet]: {
    size: 100,
    imageSrc: cutletImage,
    startPoint: { x: 1050, y: 620 },
  },
  [Ingredients.Tomato]: {
    size: 150,
    imageSrc: tomato,
    startPoint: { x: 1000, y: 450 },
  },
}

export default ingredientsParams

export const gameParams: Record<GameObjects, TGameObjectParameter> = {
  /* [GameObjects.Background]: {
    size: 1600,
    imageSrc: backgroundImage,
    startPoint: { x: 0, y: 0 },
  }, */

  [GameObjects.BurgerBread]: {
    size: 200,
    imageSrc: burgerBread,
    startPoint: { x: 100, y: 500 },
  },
  [GameObjects.Plate]: {
    size: 200,
    imageSrc: plateImage,
    startPoint: { x: 200, y: 500 },
  },
  [GameObjects.Person]: {
    size: 200,
    imageSrc: personImage,
    startPoint: { x: 300, y: 500 },
  },
  [GameObjects.Order]: {
    size: 200,
    imageSrc: totalBurgerImage,
    startPoint: { x: 500, y: 500 },
  },
}
