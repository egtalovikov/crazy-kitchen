import { $host } from '../index'
import { SignInData, SignUpData } from './auth.types'
import userApi from './userApi'

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
    const res = await $host.get('auth/user')
    const { data } = res
    //временное сохранение
    //await userApi.saveUser(data)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
