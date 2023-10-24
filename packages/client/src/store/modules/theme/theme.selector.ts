import { createSelector } from '@reduxjs/toolkit'
import { CoreRootState } from '../../types'
import { PaletteMode } from '@mui/material'

const themeSelector = (state: CoreRootState) => state?.theme

export const nameThemeSelector = createSelector(
  [themeSelector],
  themeSelector => themeSelector?.nameTheme as PaletteMode
)
