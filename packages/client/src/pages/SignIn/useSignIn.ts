import { useNavigate } from 'react-router-dom'

import { REGISTRATION_ROUTE } from '../../utils/consts'
import { FormEvent } from 'react'

export const useSignIn = () => {
  const navigate = useNavigate()

  const goToSignIn = () => {
    navigate(REGISTRATION_ROUTE)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }

  return {
    goToSignIn,
    handleSubmit,
  }
}
