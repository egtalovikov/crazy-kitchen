import React from 'react'
import { useEffect } from 'react'
import styles from './SignIn.module.scss'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useSignIn } from './useSignIn'

const SignIn = () => {
  const {
    goToSignIn,
    handleSubmit,
    isSubmitSuccessful,
    errors,
    reset,
    register,
    onSubmitHandler,
    yandexOAuthUrl,
  } = useSignIn()

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful])

  return (
    <div className={styles.background}>
      <Container
        component="main"
        maxWidth="xs"
        classes={{
          root: styles.container,
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography
            component="h1"
            variant="h3"
            classes={{
              root: styles.title,
            }}>
            Войти
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              error={!!errors['login']}
              helperText={errors['login'] ? errors['login'].message : ''}
              {...register('login')}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors['password']}
              helperText={errors['password'] ? errors['password'].message : ''}
              {...register('password')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
            <Box>
              <Link variant="body2" href={yandexOAuthUrl}>
                {'Войти через Яндекс'}
              </Link>
            </Box>
            <Link component="button" variant="body2" onClick={goToSignIn}>
              {'Нет аккаунта? Зарегистрируйтесь!'}
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default SignIn
