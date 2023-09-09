import React, { useEffect } from 'react'
import GameCanvas from '../../Modules/GameDraw'

export const Game = () => {
  useEffect(() => {
    new GameCanvas({ id: 'какие-то пропсы' })
  }, [])

  return <GameCanvas />
}

export default Game
