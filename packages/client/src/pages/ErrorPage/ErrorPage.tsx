import React from 'react'
import styles from './ErrorPage.module.scss'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { MAIN_ROUTE, NOT_FOUND_ROUTE } from '../../utils/consts'
import Typography from '@mui/material/Typography'
import { useGoToRoute } from '../../hooks/useGoToRoute'

const ErrorPage = () => {
  const isNotFound = location.pathname === NOT_FOUND_ROUTE

  const { goRoute } = useGoToRoute()

  const goToGame = () => {
    goRoute(MAIN_ROUTE)
  }

  return (
    <div className={styles.background}>
      <CssBaseline />
      <Grid
        container
        className={styles.wrapper}
        sx={{
          width: 400,
        }}
        alignItems={'center'}
        justifyContent={'center'}>
        <Grid
          className={styles.container}
          container
          alignItems={'center'}
          direction={'column'}
          p={5}>
          <Typography component="h1" variant="h2">
            {isNotFound ? '404' : '500'}
          </Typography>
          <Typography component="h2" variant="h5">
            {isNotFound ? 'Не туда попали' : 'Мы уже фиксим'}
          </Typography>
          <Box p={5}>
            <Button variant={'outlined'} onClick={goToGame}>
              Назад к игре
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ErrorPage
