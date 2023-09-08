import { useSelector } from 'react-redux'
import { AuthState } from '../../store/types'

interface AuthorizationStatusProps {
  authorizationStatus: string
  isAuthorized: boolean
  isNotAuthorized: boolean
  isUnknown: boolean
}

const useAuthorizationStatus = (): AuthorizationStatusProps => {
  const authorizationStatus = useSelector(
    (state: AuthState) => state.authorizedStatus
  )

  const isAuthorized = authorizationStatus === 'AUTH'
  const isNotAuthorized = authorizationStatus === 'NO_AUTH'
  const isUnknown = authorizationStatus === 'UNKNOWN'

  return {
    authorizationStatus,
    isAuthorized,
    isNotAuthorized,
    isUnknown,
  }
}

export default useAuthorizationStatus
