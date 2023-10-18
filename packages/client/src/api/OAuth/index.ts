import { $host } from '../index'
import { OAuthSingInData } from './OAuth.types'

export const getOAuthId = async (redirect_uri: string) => {
  try {
    const response = await $host.get(
      `oauth/yandex/service-id?redirect_uri=${redirect_uri}`
    )
    console.log('response', response)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postOAuthSignIn = async (data: OAuthSingInData) => {
  try {
    return await $host.post('oauth/yandex', { ...data })
  } catch (error) {
    console.error(error)
    throw error
  }
}
