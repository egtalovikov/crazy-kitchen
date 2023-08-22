import { useNavigate } from 'react-router-dom'

import { MAIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts'
import { postSignUp } from '../../api/auth'
import { FormEvent } from 'react'
import { fetchUserData } from '../../store/modules/auth/auth.reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const useSignUp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToSignUp = () => {
    navigate(LOGIN_ROUTE)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const signUpData = {
      first_name: data.get('first_name'),
      second_name: data.get('second_name'),
      phone: data.get('phone'),
      login: data.get('login'),
      email: data.get('email'),
      password: data.get('password'),
    }

    postSignUp(signUpData)
      .then(() => {
        dispatch(fetchUserData())
        navigate(MAIN_ROUTE)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return {
    goToSignUp,
    handleSubmit,
  }
}
