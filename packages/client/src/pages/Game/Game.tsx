import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Engine from './game/core/engine'
import GameParameters from './game/parameters/globalParams'
import style from './Game.module.scss'
import { CoreRootState } from '../../store/types'
import { GlobalGameState } from './game/types/commonTypes'
import { EndGame } from '../../components/EndGame'

const Game: React.FC = () => {
  console.log('in game')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const state = useSelector((rootState: CoreRootState) => rootState.game)

  const [burgerStats, setBurgerStats] = useState({
    burgersCollected: 0,
    timeRemaining: 60,
  })

  const [gameOver, setGameOver] = useState(false)

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
    // Engine.getInstance(ctx).drawGame()
    Engine.getInstance(ctx).startGame()

    // Обработчики перетаскивания ингредиентов.
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // todo can we remove engine and canvas from args?
  const handleMouseDown = (event: MouseEvent) => {
    // todo move in method ?
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const clickX = event.clientX - canvas.getBoundingClientRect().left
    const clickY = event.clientY - canvas.getBoundingClientRect().top
    Engine.getInstance().checkDragging({ x: clickX, y: clickY })
  }

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const x = event.clientX - canvas.getBoundingClientRect().left - 20
    const y = event.clientY - canvas.getBoundingClientRect().top - 20
    Engine.getInstance().handleDragging({ x, y })
  }

  const handleMouseUp = () => {
    Engine.getInstance().draggingStopped()
    console.log('state')
    console.log(state)
  }

  useEffect(() => {
    console.log('in state useEffect')
    if (
      state.gameState == GlobalGameState.Failed ||
      state.gameState == GlobalGameState.Winned
    ) {
      setGameOver(true)
      console.log('game over')
    } else {
      console.log(state.gameState)
      console.log('game is running')
      // todo do we need it?
      setBurgerStats(prevState => ({
        ...prevState,
        burgersCollected: state.score,
        timeRemaining: state.remainingTime,
      }))
    }
  }, [state])

  if (gameOver) {
    return <EndGame />
  }
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
