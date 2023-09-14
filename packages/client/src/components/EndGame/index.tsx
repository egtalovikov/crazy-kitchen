import React from 'react'
import styles from './EndGame.module.scss'
import { useGoToRoute } from '../../utils/useGoToRoute'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { MAIN_ROUTE } from '../../utils/consts'

export const EndGame = ({
  show,
  burgerCount,
}: {
  show: boolean
  burgerCount: number
}) => {
  const { goRoute } = useGoToRoute()

  return (
    <div className={`${styles.wrapper} ${show ? styles.opened : ''}`}>
      <div className={styles.container}>
        <Typography className={styles.title}>Игра окончена!</Typography>
        <Typography className={styles.title}>
          Бургеров собрано: {burgerCount}
        </Typography>
        <Box
          p={3}
          sx={{
            gap: 2,
          }}
          className={styles.buttonsContainer}
          alignItems={'center'}
          justifyContent={'center'}>
          <Button
            variant={'outlined'}
            // сюда вписать функцию рестарта игры
          >
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
