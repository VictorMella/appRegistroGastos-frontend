import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TokenService } from '../services/token.service'

const URLS_SIN_TOKEN = ['/auth/login', '/usuario/create']

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (URLS_SIN_TOKEN.some(url => req.url.includes(url))) {
      return next.handle(req)
    }

    const reqConToken = req.clone({
      setHeaders: { appToken: this.tokenService.getToken() }
    })
    return next.handle(reqConToken)
  }
}
