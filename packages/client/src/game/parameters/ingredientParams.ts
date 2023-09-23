import cutletImage from '@assets/ingredients/cutlet.png'
import cheeseImage from '@assets/ingredients/cheese.png'
import tomatoImage from '@assets/ingredients/tomato.png'
import saladImage from '@assets/ingredients/salad.png'
import burgerBread from '@assets/ingredients/burgerBread.png'
import { Ingredients, TIngredientParameter } from '../types/ingredients'

const ingredientsParams: Record<Ingredients, TIngredientParameter> = {
  [Ingredients.Cheese]: {
    width: 100,
    height: 100,
    imageSrc: cheeseImage,
    frameWidth: 100,
    startPoint: { x: 1335, y: 650 },
    preparationRequired: false,
  },
  [Ingredients.Salad]: {
    width: 100,
    height: 100,
    imageSrc: saladImage,
    frameWidth: 100,
    startPoint: { x: 1335, y: 750 },
    preparationRequired: false,
  },
  [Ingredients.Cutlet]: {
    width: 100,
    height: 100,
    imageSrc: cutletImage,
    frameWidth: 100,
    startPoint: { x: 1200, y: 750 },
    preparationRequired: true,
  },
  [Ingredients.Tomato]: {
    width: 120,
    height: 120,
    imageSrc: tomatoImage,
    frameWidth: 100,
    startPoint: { x: 1200, y: 650 },
    preparationRequired: false,
  },
  [Ingredients.Bread]: {
    width: 200,
    height: 200,
    imageSrc: burgerBread,
    frameWidth: 100,
    startPoint: { x: 800, y: 730 },
    preparationRequired: false,
  },
}

export default ingredientsParams
