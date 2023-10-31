export function getTokenFromCookie(cookieName: string) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1)
    }
  }
  return null
}

export function setCookie(name: string, value: string) {
  const updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value)
  document.cookie = updatedCookie
}
