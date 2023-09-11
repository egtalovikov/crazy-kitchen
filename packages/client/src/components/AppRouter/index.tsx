import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import { privateRoutes, publicRoutes } from '../../routes'
import LoadingScreen from '../../pages/LoadingScreen'
import useAuthorizationStatus from '../../hooks/useAuthorizationStatus'

const AppRouter = () => {
  const { isUnknown } = useAuthorizationStatus()

  if (isUnknown) {
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
