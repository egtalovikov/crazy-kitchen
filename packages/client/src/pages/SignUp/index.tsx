import React, { useEffect } from 'react'
import styles from './SignUp.module.scss'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import { useSignUp } from './useSignUp'

const SignUp = () => {
  const {
    goToSignUp,
    handleSubmit,
    isSubmitSuccessful,
    errors,
    reset,
    register,
    onSubmitHandler,
  } = useSignUp()

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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component="h1" variant="h5">
            Зарегистрироваться
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitHandler)}
            sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="first_name"
                  label="Имя"
                  error={!!errors['first_name']}
                  helperText={
                    errors['first_name'] ? errors['first_name'].message : ''
                  }
                  {...register('first_name')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="second_name"
                  label="Фамилия"
                  error={!!errors['second_name']}
                  helperText={
                    errors['second_name'] ? errors['second_name'].message : ''
                  }
                  {...register('second_name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Логин"
                  error={!!errors['login']}
                  helperText={errors['login'] ? errors['login'].message : ''}
                  {...register('login')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  error={!!errors['email']}
                  helperText={errors['email'] ? errors['email'].message : ''}
                  {...register('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Пароль"
                  type="password"
                  id="password"
                  error={!!errors['password']}
                  helperText={
                    errors['password'] ? errors['password'].message : ''
                  }
                  {...register('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Телефон"
                  type="tel"
                  id="phone"
                  error={!!errors['phone']}
                  helperText={errors['phone'] ? errors['phone'].message : ''}
                  {...register('phone')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Зарегистрироваться
            </Button>
            <Link href="#" variant="body2" onClick={goToSignUp}>
              Уже есть аккаунт? Войдите!
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default SignUp
