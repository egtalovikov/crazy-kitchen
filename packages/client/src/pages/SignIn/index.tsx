import React from 'react'
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
  const { goToSignIn, handleSubmit } = useSignIn()

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
            onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
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
