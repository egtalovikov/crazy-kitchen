import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Engine from '@/game/core/engine'
import style from './Game.module.scss'
import { CoreRootState } from '@/store/types'
import { TPoint } from '@/game/types/commonTypes'
import { EndGame } from '@components/EndGame'

const Game: React.FC = () => {
  const state = useSelector((rootState: CoreRootState) => rootState.game)
  const [gameOver, setGameOver] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextDelegate = useCallback((): CanvasRenderingContext2D => {
    const context = canvasRef.current?.getContext('2d')
    if (context) {
      return context
    } else {
      throw Error('contextDelegate : canvas not found')
    }
  }, [])

  const gameEngineRef = useRef<Engine>(new Engine(contextDelegate))

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
    gameEngineRef.current?.handleDruggingStart(getClickCoordinates(event))

  const handleMouseMove = (event: MouseEvent) =>
    gameEngineRef.current?.handleDraggingMove(getClickCoordinates(event))

  const handleMouseUp = () => gameEngineRef.current?.handleDraggingStop()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.log('useEffect : canvas not found')
      return
    }
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    gameEngineRef.current?.startGame()

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

  /* this will repaint remaining time every second */
  useEffect(() => {
    if (gameEngineRef.current?.isGameOver()) {
      setGameOver(true)
    }
  }, [state.gameState])

  if (gameOver) {
    return (
      <div className={style.endBackground}>
        <EndGame engine={gameEngineRef.current} />
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
