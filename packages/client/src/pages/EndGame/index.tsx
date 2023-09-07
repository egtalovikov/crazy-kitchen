import React from 'react'
import styles from './EndGame.module.scss'
import { useGoToRoute } from '../../hooks/useGoToRoute'
import { MAIN_ROUTE } from '../../utils/consts'
import { ButtonBlue } from '../../components/Button'

export const EndGame = () => {
  const { goRoute } = useGoToRoute()

  return (
    <div className={styles.background}>
      <ButtonBlue onClickCallback={() => goRoute(MAIN_ROUTE)}>
        Повторить
      </ButtonBlue>
    </div>
  )
}
