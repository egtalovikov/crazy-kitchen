import { useNavigate } from 'react-router-dom'

import { LOGIN_ROUTE } from '../../utils/consts'
import { FormEvent } from 'react'

export const useSignUp = () => {
  const navigate = useNavigate()

  const goToSignUp = () => {
    navigate(LOGIN_ROUTE)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return {
    goToSignUp,
    handleSubmit,
  }
}
