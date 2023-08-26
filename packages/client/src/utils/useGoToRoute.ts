import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const useGoToRoute = () => {
  const navigate = useNavigate()

  const goRoute = useCallback((route: string) => {
    navigate(route)
  }, [])
  return { goRoute }
}
