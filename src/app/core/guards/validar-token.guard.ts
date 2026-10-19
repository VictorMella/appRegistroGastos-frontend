import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { TokenService } from '../services/token.service'

@Injectable({
  providedIn: 'root'
})

export class ValidarTokenGuard  {
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.validar()
  }
  canLoad(): Observable<boolean> | boolean {
    return this.validar()
  }

  private validar(): Observable<boolean> | boolean {
    if (this.tokenService.isTokenExpired()) {
      localStorage.clear();
      this.router.navigateByUrl('/auth/login')
      return false
    }

    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            localStorage.clear();
            this.router.navigateByUrl('/auth/login')
          }
        })
      )
  }
}
