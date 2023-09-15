import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Engine from './game/core/engine'
import GameParameters from './game/parameters/globalParams'
import style from './Game.module.scss'
import { CoreRootState } from '../../store/types'
import { GlobalGameState } from './game/types/commonTypes'

const Game: React.FC = () => {
  console.log('in game')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const state = useSelector((rootState: CoreRootState) => rootState.game)

  const [burgerStats, setBurgerStats] = useState({
    burgersCollected: 0,
    timeRemaining: 60,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('no canvas')
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.log('no context')
      return
    }

    console.log('in use effect')
    console.log(ctx)

    // Функция для перерисовки игры.
    Engine.getInstance(ctx).drawGame()

    // Обработчик начала перетаскивания всех ингредиентов.
    /* canvas.addEventListener('mousedown', event => {
      handleMouseDown(event, canvas)
    })

    // Обработчик перемещения мыши.
    canvas.addEventListener('mousemove', event => {
      handleMouseMove(event, canvas)
    })

    // Обработчик завершения перетаскивания.
    canvas.addEventListener('mouseup', handleMouseUp) */
  }, [])

  // todo can we remove engine and canvas from args?
  const handleMouseDown = (event: MouseEvent, canvas: HTMLCanvasElement) => {
    // todo move in method ?
    const clickX = event.clientX - canvas.getBoundingClientRect().left
    const clickY = event.clientY - canvas.getBoundingClientRect().top
    Engine.getInstance().checkDragging({ x: clickX, y: clickY })
  }

  const handleMouseMove = (event: MouseEvent, canvas: HTMLCanvasElement) => {
    const x = event.clientX - canvas.getBoundingClientRect().left - 20
    const y = event.clientY - canvas.getBoundingClientRect().top - 20
    Engine.getInstance().handleDragging({ x, y })
  }

  const handleMouseUp = () => Engine.getInstance().draggingStopped()

  useEffect(() => {
    if (state.gameState == GlobalGameState.Finished) {
      alert(`Игра окончена!`)
    } else {
      console.log(state.gameState)
      console.log('game is running')
      // todo do we need it?
      setBurgerStats(prevState => ({
        ...prevState,
        timeRemaining: state.remainingTime,
      }))
    }
  }, [state])
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
