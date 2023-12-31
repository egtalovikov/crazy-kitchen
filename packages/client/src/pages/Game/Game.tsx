import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import style from './Game.module.scss'
import { CoreRootState } from '@/store/types'
import { TPoint } from '@gameTypes/commonTypes'
import { EndGame } from '@components/EndGame'
import engine from '@game/core/engine'

const Game: React.FC = () => {
  const state = useSelector((rootState: CoreRootState) => rootState.game)

  const [gameOver, setGameOver] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const getClickCoordinates = (event: MouseEvent): TPoint => {
    const canvas = canvasRef.current
    if (!canvas) {
      throw Error('getClickCoordinates : canvas not found')
    } else {
      return {
        x: event.clientX - canvas.getBoundingClientRect().left,
        y: event.clientY - canvas.getBoundingClientRect().top,
      }
    }
  }

  const handleMouseDown = (event: MouseEvent) =>
    engine.handleDruggingStart(getClickCoordinates(event))

  const handleMouseMove = (event: MouseEvent) =>
    engine.handleDraggingMove(getClickCoordinates(event))

  const handleMouseUp = () => engine.handleDraggingStop()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      throw Error('useEffect : canvas not found')
    }
    const context = canvas.getContext('2d')
    if (!context) {
      throw Error('useEffect : canvas context not found')
    }

    // TODO: resize canvas on window resize
    /*canvas.width = window.innerWidth
    canvas.height = window.innerHeight*/
    canvas.width = 1593
    canvas.height = 959

    engine.setDrawingHelper(context)
    engine.startGame()

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    setGameOver(engine.isGameOver())
  }, [state.globalGameState])

  if (gameOver) {
    return (
      <div className={style.endBackground}>
        <EndGame />
      </div>
    )
  }

  return (
    <div className={style.game}>
      <canvas className={style.game__background} ref={canvasRef}></canvas>
    </div>
  )
}

export default Game
