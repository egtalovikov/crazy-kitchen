import { TGameState } from '@/store/types'
import Painter from '../core/painter'
// import { Ingredients } from '../types/ingredients'

class DrawStateHelper {
  public static drawLevelState = (painter: Painter, state: TGameState) => {
    // todo can we calculate this?
    const textGap = 50
    let startY = 70
    const x = 50

    // painter.drawRect({ x: 20, y: 40 }, 250, 380)

    const timeText = `Время: ${state.remainingTime} сек.`
    painter.drawText(timeText, { x, y: startY }) // set coordinate
    const scoreText = `Собрано бургеров: ${state.score}`
    painter.drawText(scoreText, { x, y: (startY += textGap) })

    //const currentOrder = state.level.orders[state.orderIndex]
    /* const ingredientsText = [
      'Нужно добавить ',
      `помидоров : ${currentOrder[Ingredients.Tomato]} шт`,
      `кусочков сыра : ${currentOrder[Ingredients.Cheese]} шт`,
      `котлет : ${currentOrder[Ingredients.Cutlet]} шт`,
      `листов салата : ${currentOrder[Ingredients.Salad]} шт`,
    ] */

    /* ingredientsText.forEach(text => {
      painter.drawText(text, { x, y: (startY += textGap) })
    }) */
  }
}

export default DrawStateHelper
