import { useNavigate } from 'react-router-dom'

import { MAIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts'
import { postSignUp } from '@api/auth'
import { fetchUserData } from '@store/modules/auth/auth.reducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginSchema, LoginInputs } from '@utils/validationsSchema'
import { zodResolver } from '@hookform/resolvers/zod'

export const useSignUp = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInputs>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToSignUp = () => {
    navigate(LOGIN_ROUTE)
  }
  const onSubmitHandler: SubmitHandler<LoginInputs> = async (values, event) => {
    event?.preventDefault()

    try {
      await postSignUp(values)

      dispatch(fetchUserData())
      navigate(MAIN_ROUTE)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    goToSignUp,
    register,
    errors,
    isSubmitSuccessful,
    reset,
    onSubmitHandler,
    handleSubmit,
  }
}
