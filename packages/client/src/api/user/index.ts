import { $host } from '../index'

export const getUserInfo = async () => {
  const { data } = await $host.get('auth/user')
  return data
}

export const changePassword = async (passwords: {
  oldPassword: string
  newPassword: string
}) => {
  const data = await $host.put('user/password', passwords)
  return data
}

export const changeAvatar = async (avatar: File) => {
  const data = await $host.putForm('user/profile/avatar', {
    avatar: avatar,
  })
  return data
}
