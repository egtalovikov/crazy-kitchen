import React from 'react'
import styles from './StartPage.module.scss'
import { MAIN_ROUTE } from '../../utils/consts'
import { useGoToRoute } from '../../utils/useGoToRoute'
import { ButtonBlue } from '../../components/Button'

const StartPage = () => {
  const { goRoute } = useGoToRoute()

  return (
    <div className={styles.background}>
      <ButtonBlue onClickCallback={() => goRoute(MAIN_ROUTE)}>start</ButtonBlue>
    </div>
  )
}

export default StartPage
