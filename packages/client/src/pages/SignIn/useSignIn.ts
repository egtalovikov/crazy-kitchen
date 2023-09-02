import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts'
import { postSignIn } from '../../api/auth'
import { fetchUserData } from '../../store/modules/auth/auth.reducer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterInput } from '../../utils/validationsSchema'

export const useSignIn = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToSignIn = () => {
    navigate(REGISTRATION_ROUTE)
  }

  const onSubmitHandler: SubmitHandler<RegisterInput> = async values => {
    try {
      await postSignIn(values)

      dispatch(fetchUserData())
      navigate(MAIN_ROUTE)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    goToSignIn,
    register,
    errors,
    isSubmitSuccessful,
    reset,
    onSubmitHandler,
    handleSubmit,
  }
}
