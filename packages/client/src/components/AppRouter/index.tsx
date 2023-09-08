import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
// import { useSelector } from 'react-redux'
import { privateRoutes, publicRoutes } from '../../routes'
// import { authorizedStatusSelector } from '../../store/modules/auth/auth.selector'
import LoadingScreen from '../../pages/LoadingScreen'
import { AUTHORIZATION_STATUS } from '../../utils/consts'
import useAuthorizationStatus from '../../hooks/useAuthorizationStatus'

const AppRouter = () => {
  const { authorizationStatus } = useAuthorizationStatus()

  if (authorizationStatus === AUTHORIZATION_STATUS.UNKNOWN) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        {privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  )
}

export default AppRouter
