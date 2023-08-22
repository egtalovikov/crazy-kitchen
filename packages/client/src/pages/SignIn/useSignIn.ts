import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { FormEvent } from 'react'
import { MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { postSignIn } from '../../api/auth'
import { fetchUserData } from '../../store/modules/auth/auth.reducer'

export const useSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToSignIn = () => {
    navigate(REGISTRATION_ROUTE)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const signInData = {
      login: data.get('login'),
      password: data.get('password'),
    }

    postSignIn(signInData)
      .then(() => {
        dispatch(fetchUserData())
        navigate(MAIN_ROUTE)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return {
    goToSignIn,
    handleSubmit,
  }
}
