import { createTheme, PaletteMode } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import { getDesignTokens } from './theme'
import { createUserTheme } from '../store/modules/theme/theme.reducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { userIdSelector } from '../store/modules/auth/auth.selector'
import { useSelector } from 'react-redux'
import { nameThemeSelector } from '../store/modules/theme/theme.selector'

export const useColorTheme = () => {
  const dispatch = useAppDispatch()
  const userId = useSelector(userIdSelector)
  const theme = useSelector(nameThemeSelector)

  const [mode, setMode] = useState<PaletteMode>(theme)

  useEffect(() => {
    setMode(theme)
  }, [theme])

  const toggleColorMode = () => {
    dispatch(
      createUserTheme({
        themeName: mode === 'light' ? 'dark' : 'light',
        userId,
      })
    )

    setMode(mode === 'light' ? 'dark' : 'light')
  }

  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  )

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  }
}
