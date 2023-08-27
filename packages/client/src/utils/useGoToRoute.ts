import { useNavigate } from 'react-router-dom'

export const useGoToRoute = () => {
  const navigate = useNavigate()
  const goRoute = (route: string) => {
    navigate(route)
  }
  return { goRoute }
}
