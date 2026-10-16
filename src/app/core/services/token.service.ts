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
}
