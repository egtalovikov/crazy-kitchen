import React, { FC } from 'react'
import styles from './EndGame.module.scss'
import { useGoToRoute } from '@/utils/useGoToRoute'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { MAIN_ROUTE } from '@/utils/consts'
import { useSelector } from 'react-redux'
import { CoreRootState } from '@/store/types'
import engine from '@/game/core/engine'

export const EndGame: FC = () => {
  const { goRoute } = useGoToRoute()
  const { score } = useSelector((rootState: CoreRootState) => rootState.game)
  const gameOverMessage = engine.isGameWinned() ? 'Вы выиграли' : 'Вы проиграли'

  const startGameOver = () => engine.restartGame()

  return (
    <div className={`${styles.wrapper} ${styles.opened}`}>
      <div className={styles.container}>
        <Typography className={styles.title}>Игра окончена!</Typography>
        <Typography className={styles.title}>{gameOverMessage}</Typography>
        <Typography className={styles.title}>
          Бургеров собрано: {score}
        </Typography>
        <Box
          p={3}
          sx={{
            gap: 2,
          }}
          className={styles.buttonsContainer}
          alignItems={'center'}
          justifyContent={'center'}>
          <Button variant={'outlined'} onClick={startGameOver}>
            Начать заново
          </Button>
          <Button variant={'outlined'} onClick={() => goRoute(MAIN_ROUTE)}>
            Главное меню
          </Button>
        </Box>
      </div>
    </div>
  )
}
