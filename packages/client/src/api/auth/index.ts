import { $host } from '../index'
import { SignInData, SignUpData } from './auth.types'

export const postSignUp = async (data: SignUpData) => {
  try {
    const {
      data: { id },
    } = await $host.post('auth/signup', { ...data })

    return id
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postSignIn = async (data: SignInData) => {
  try {
    return await $host.post('auth/signin', { ...data })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserInfo = async () => {
  try {
    const { data } = await $host.get('auth/user')

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
