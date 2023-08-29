import React, { FC } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'

export const ButtonBlue: FC<ButtonProps> = ({ children, onClickCallback }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#5bc7f2',
      },
    },
    typography: {
      body1: {
        color: '#FFF',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClickCallback}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}>
        <Typography variant="body1">{children}</Typography>
      </Button>
    </ThemeProvider>
  )
}

export interface ButtonProps {
  children: React.ReactNode
  onClickCallback?: () => void
}
