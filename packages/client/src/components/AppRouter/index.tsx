import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import { privateRoutes, publicRoutes } from '../../routes'
import LoadingScreen from '../../pages/LoadingScreen'
import useAuthorizationStatus from '../../hooks/useAuthorizationStatus'
import MainPage from '../../pages/MainPage'

const AppRouter = () => {
  const { isUnknown, isAuthorized } = useAuthorizationStatus()

  if (isUnknown) {
    return <LoadingScreen />
  }

  if (isAuthorized) {
    return <MainPage />
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
