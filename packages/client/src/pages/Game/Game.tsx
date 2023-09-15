import React, { useRef, useEffect, useState } from 'react'
import Engine from './game/core/engine'
import Ingredient from './game/objects/ingredient'
import GameParameters from './game/parameters/globalParams'
import style from './Game.module.scss'
import gameState from './game/store/gameState'

const Game: React.FC = () => {
  console.log('in game')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Флаг для отслеживания анимации перемещения котлетки.
  // let isAnimating = false

  // Переменная для отображения времени (в секундах).
  // let timeInSeconds = 0

  const [burgerStats, setBurgerStats] = useState({
    burgersCollected: 0,
    timeRemaining: 60,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const engine = new Engine(ctx)

    // Функция для перерисовки игры.
    engine.drawGame()

    const handleMouseDown = (event: MouseEvent) => {
      // todo move in method ?
      const clickX = event.clientX - canvas.getBoundingClientRect().left
      const clickY = event.clientY - canvas.getBoundingClientRect().top

      engine.checkDragging({ x: clickX, y: clickY })
    }

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX - canvas.getBoundingClientRect().left - 20
      const y = event.clientY - canvas.getBoundingClientRect().top - 20

      engine.handleDragging({ x, y })
    }

    const handleMouseUp = () => {
      engine.draggingStopped()
      setBurgerStats(prevState => ({
        ...prevState,
        burgersCollected: gameState.burgersFinished,
      }))
    }

    // Обработчик начала перетаскивания всех ингредиентов.
    canvas.addEventListener('mousedown', handleMouseDown) // todo do we need to remove it?

    // Обработчик перемещения мыши.
    canvas.addEventListener('mousemove', handleMouseMove)

    // Обработчик завершения перетаскивания.
    canvas.addEventListener('mouseup', handleMouseUp)

    // Функция для анимации перемещения котлетки на булочку.
    /* const animatePatty = () => {
      const targetX = bunX - 30
      const targetY = bunY + 20
      const deltaX = (targetX - pattyX) / 20
      const deltaY = (targetY - pattyY) / 20
      let frameCount = 0

      const animationFrame = () => {
        if (pattyX < targetX) {
          pattyX += deltaX
        }
        if (pattyY < targetY) {
          pattyY += deltaY
        }

        drawGame()

        if (pattyX < targetX || pattyY < targetY) {
          requestAnimationFrame(animationFrame)
        } else {
          isAnimating = false
          frameCount = 0
          pattyX = bunX - 30
          pattyY = bunY + 20
        }

        frameCount++
      }
      requestAnimationFrame(animationFrame)
    } */

    // Функция для обновления игры (таймер).
    /* const updateGame = () => {
      timeInSeconds += 1

      if (timeInSeconds >= 60) {
        alert(`Игра окончена!`)
        clearInterval(gameInterval)
        return
      }

      setBurgerStats(prevState => ({
        ...prevState,
        timeRemaining: 60 - timeInSeconds,
      }))
    } */

    // const gameInterval = setInterval(updateGame, 1000)
  }, [])

  return (
    <div className={style.gameBackground}>
      <canvas
        ref={canvasRef}
        width={GameParameters.WIDTH}
        height={GameParameters.HEIGHT}></canvas>
      <div className="stats">
        <p>Время: {burgerStats.timeRemaining} сек.</p>
        <p>Собрано бургеров: {burgerStats.burgersCollected}</p>
      </div>
    </div>
  )
}

export default Game
