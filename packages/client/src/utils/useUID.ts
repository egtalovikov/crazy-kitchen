import { useEffect, useState } from 'react'

export const generateUID = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const useUID = () => {
  const [uid, setUID] = useState('')

  useEffect(() => {
    const generatedUID = generateUID()
    setUID(generatedUID)
  }, [])

  return uid
}
