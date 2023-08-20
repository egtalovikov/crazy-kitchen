import React from 'react'
import styles from './MainPage.module.scss'
import { ButtonBlue } from '../../components/Button'
import {
  FORUM_ROUTE,
  GAME_ROUTE,
  LEADERBOARD_ROUTE,
  PROFILE_ROUTE,
} from '../../utils/consts'
import { useGoToRoute } from '../../utils/useGoToRoute'
import Box from '@mui/material/Box'

const MainPage = () => {
  const { goRoute } = useGoToRoute()

  return (
    <div className={styles.background}>
      <div className={styles.wrapper_buttons}>
        <ButtonBlue onClickCallback={() => goRoute(FORUM_ROUTE)}>
          форум
        </ButtonBlue>
        <ButtonBlue onClickCallback={() => goRoute(LEADERBOARD_ROUTE)}>
          лидерборд
        </ButtonBlue>
        <ButtonBlue onClickCallback={() => goRoute(PROFILE_ROUTE)}>
          профиль
        </ButtonBlue>
      </div>

      <Box
        bgcolor="#5bc7f2"
        color="white"
        p={4}
        style={{ borderRadius: 8 }}
        className={styles.description}>
        <div className={styles.description_text}>
          Вас охватывает безумие готовки, и вы жарите и режете как кухонный
          комбайн. Вы работаете в ресторанах разных стран и делаете самые разные
          блюда. ЖМИТЕ быстрее, чтобы успеть всё приготовить и подать клиентам.
          Напряженный, но логичный игровой процесс не даст заскучать и добавит
          адреналина в вашу жизнь.
        </div>
      </Box>

      <div className={styles.button_wrapper}>
        <ButtonBlue onClickCallback={() => goRoute(GAME_ROUTE)}>
          играть
        </ButtonBlue>
      </div>
    </div>
  )
}

export default MainPage
