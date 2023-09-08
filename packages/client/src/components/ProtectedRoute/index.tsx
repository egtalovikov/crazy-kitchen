import useAuthorizationStatus from '../../hooks/useAuthorizationStatus'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthorized } = useAuthorizationStatus()

  if (!isAuthorized) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
