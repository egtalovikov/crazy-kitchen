import { v4 as uuidv4 } from 'uuid'
import jsonwebtoken from 'jsonwebtoken'

function generateSecretKey(length: number): string {
  return uuidv4().replace(/-/g, '').substring(0, length)
}

export function generateToken(payload: IPayload) {
  const expiresIn = '168h'
  const secretKey = generateSecretKey(8)
  const token = jsonwebtoken.sign(payload, secretKey, { expiresIn })
  return { token, expiresIn, secretKey }
}

export interface IPayload {
  UserId: number
}
