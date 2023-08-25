import { $authHost } from '../index'

export const getUserInfo = async () => {
  const { data } = await $authHost.get('auth/user')
  return data
}

export const changePassword = async (passwords: {
  oldPassword: string
  newPassword: string
}) => {
  const data = await $authHost.put('user/password', passwords)
  return data
}

export const changeAvatar = async (avatar: File) => {
  const data = await $authHost.putForm('user/profile/avatar', {
    avatar: avatar,
  })
  return data
}
