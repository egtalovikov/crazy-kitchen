import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ThemeState } from '../../types'
import ThemeApi from '../../../api/themes/themeApi'
import {
  TThemeData,
  TChangeThemeRequestData,
} from '../../../api/themes/theme.types'

const initialState: ThemeState = {
  nameTheme: 'light',
  descriptionTheme: '',
}

const getMockData = {
  name: 'dark',
  description: 'dark theme',
}

const saveMockData = {
  name: 'light',
  description: 'light',
}

export const fetchUserTheme = createAsyncThunk(
  'theme/fetchUserTheme',
  async () => {
    const { theme } = await ThemeApi.getTheme()

    return getMockData as TThemeData
  }
)

export const createUserTheme = createAsyncThunk(
  'theme/createUserTheme',
  async (data: TChangeThemeRequestData) => {
    const res = await ThemeApi.saveTheme(data)

    return { ...saveMockData, name: data.themeName }
  }
)

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchUserTheme.fulfilled, (state, { payload }) => {
      state.nameTheme = payload.name
      state.descriptionTheme = payload.description
    }),
      addCase(createUserTheme.fulfilled, (state, { payload }) => {
        state.nameTheme = payload.name
        state.descriptionTheme = payload.description
      })
  },
})

export default themeSlice.reducer
