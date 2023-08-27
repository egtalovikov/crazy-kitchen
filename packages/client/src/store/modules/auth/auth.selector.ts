import { createSelector } from '@reduxjs/toolkit'
import { CoreRootState } from '../../types'

const authSelector = (state: CoreRootState) => state?.authReducer

export const authorizedStatusSelector = createSelector(
  [authSelector],
  authSelector => authSelector?.authorizedStatus
)
