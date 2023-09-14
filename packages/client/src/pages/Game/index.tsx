import React, { useEffect, useMemo } from 'react'
import GameCanvas from '../../Modules/GameDraw'
import { setOrder } from '../../utils/gameCore'
import totalBurgerImage from '../../assets/ingredients/totalBurger.png'
import burgerTomatoSaladImage from '../../assets/ingredients/burgerTomatoSalad.png'
import burgerCheeseSaladImage from '../../assets/ingredients/burgerCheeseSalad.png'

export const Game = () => {
  const { indexOrder } = setOrder()

  const imgSrcOrder = useMemo(() => {
    switch (indexOrder) {
      case 0:
        return totalBurgerImage as string
      case 1:
        return burgerTomatoSaladImage as string
      case 2:
        return burgerCheeseSaladImage as string
      default:
        return ''
    }
  }, [indexOrder])

  useEffect(() => {
    // @ts-ignore
    new GameCanvas({})
  }, [])

  // @ts-ignore
  return <GameCanvas orderImage={imgSrcOrder} />
}

export default Game
