export const authorizedStatusSelector = (state: {
  authReducer: { authorizedStatus: string }
}) => state?.authReducer?.authorizedStatus
