import { useSelector } from 'react-redux'
import { authorizedStatusSelector } from '../../store/modules/auth/auth.selector'

interface AuthorizationStatusProps {
  authorizationStatus: string
  isAuthorized: boolean
  isNotAuthorized: boolean
  isUnknown: boolean
}

const useAuthorizationStatus = (): AuthorizationStatusProps => {
  const authorizationStatus = useSelector(authorizedStatusSelector)

  const isAuthorized = authorizationStatus === 'AUTH'
  console.log('isAuthorized', isAuthorized)
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
