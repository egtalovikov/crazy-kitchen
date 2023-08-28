import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authorizedStatusSelector } from '../../store/modules/auth/auth.selector'
import { AUTHORIZATION_STATUS } from '../../utils/consts'

const ProtectedRoute = () => {
  const authorizedStatus = useSelector(authorizedStatusSelector)

  if (authorizedStatus !== AUTHORIZATION_STATUS.AUTH) {
    return <Navigate to={`/login`} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
