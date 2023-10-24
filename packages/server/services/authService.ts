class AuthService {
  // mock method, will be implemented in the scope of CK-42
  async findUserByCookies(uuid: number, authCookie: string) {
    console.log(uuid)
    console.log(authCookie)
    return { dataValues: { UserId: 0 } }
  }
}
export default new AuthService()
