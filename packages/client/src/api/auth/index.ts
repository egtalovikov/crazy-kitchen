import axios from 'axios'
import { SignInData, SignUpData } from './auth.types'

const BASE_URL = 'https://ya-praktikum.tech/api/v2/auth'

export const postSignUp = async (data: SignUpData) => {
  try {
    const {
      data: { id },
    } = await axios.post(
      `${BASE_URL}/signup`,
      { ...data },
      {
        withCredentials: true,
      }
    )

    return id
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postSignIn = async (data: SignInData) => {
  try {
    return await axios.post(
      `${BASE_URL}/signin`,
      { ...data },
      {
        withCredentials: true,
      }
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserInfo = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    })

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
