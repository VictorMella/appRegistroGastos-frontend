import { Injectable } from '@angular/core'

const TOKEN_KEY = 'appToken'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || ''
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  }

  isTokenExpired(): boolean {
    const token = this.getToken()
    if (!token) {
      return true
    }

    const payload = this.decodePayload(token)
    if (!payload?.exp) {
      return false
    }

    return Date.now() >= payload.exp * 1000
  }

  private decodePayload(token: string): any {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      return JSON.parse(atob(base64))
    } catch {
      return null
    }
  }
}
