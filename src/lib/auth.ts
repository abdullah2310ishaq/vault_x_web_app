import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  userid: string
  name: string
  role: string
  exp: number
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
  } catch (error) {
    return false
  }
}

export function getUserRole(): string | null {
  const token = getToken()
  if (!token) return null

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    return decoded.role
  } catch (error) {
    return null
  }
}

export function getUserId(): string | null {
  const token = getToken()
  if (!token) return null

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    return decoded.userid
  } catch (error) {
    return null
  }
}

export function getUserName(): string | null {
  const token = getToken()
  if (!token) return null

  try {
    const decoded = jwtDecode<DecodedToken>(token)
    return decoded.name
  } catch (error) {
    return null
  }
}
