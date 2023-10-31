import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { MAIN_ROUTE, REGISTRATION_ROUTE } from '@utils/consts'
import { postSignIn } from '@api/auth'
import {
  fetchUserData,
  fetchYandexId,
  signInYandex,
} from '@store/modules/auth/auth.reducer'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import useAuthorizationStatus from '../../hooks/useAuthorizationStatus'
import { yandexOAuthIdSelector } from '../../store/modules/auth/auth.selector'
import { registerSchema, RegisterInputs } from '@utils/validationsSchema'
import authApi from '@api/auth/authApi'
import userApi from '@api/auth/userApi'

export const useSignIn = () => {
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInputs>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
  })

  const { isAuthorized } = useAuthorizationStatus()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const yandexOAuthId = useSelector(yandexOAuthIdSelector)

  const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${yandexOAuthId}&redirect_uri=${window.location.href}`
  useEffect(() => {
    const codeYandexOAuth = searchParams.get('code')
    if (codeYandexOAuth && !isAuthorized) {
      const data = {
        code: `${codeYandexOAuth}`,
        redirect_uri: `${window.location.href.split('?')[0]}`,
      }
      dispatch(signInYandex(data))
      dispatch(fetchUserData())
      navigate(MAIN_ROUTE)
      setSearchParams('')
    } else if (!isAuthorized) {
      dispatch(fetchYandexId(`${window.location.href}`))
    }
  }, [])

  const goToSignIn = () => {
    navigate(REGISTRATION_ROUTE)
  }

  const onSubmitHandler: SubmitHandler<RegisterInputs> = async (
    values,
    event
  ) => {
    event?.preventDefault()
    console.log(values)
    try {
      await postSignIn(values)
      const data = dispatch(fetchUserData())

      data
        .then(res => {
          return authApi.token(+res.payload.id)
        })
        .then(() => {
          data.then(res => {
            setTimeout(() => {
              userApi.saveUser(res.payload)
            }, 3000)
          })
        })

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
    searchParams,
    setSearchParams,
    yandexOAuthUrl,
  }
}
