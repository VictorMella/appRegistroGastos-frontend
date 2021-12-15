import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, delay, map, tap } from 'rxjs/operators'
import { AuthResponse } from '../core/interfaces/iAuthResponse.interface'
import { Usuario } from '../core/interfaces/iUsuario.interface'
import { environment } from 'src/environments/environment'
import { DtoLogin } from '../core/interfaces/Dtologin.interface'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { AjaxError } from 'rxjs/ajax'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  time: number
  private _usuario!: Usuario

  get usuario() {
    return { ...this._usuario }
  }

  constructor(private http: HttpClient) {
    this.time = 1000
  }

  login(payload : DtoLogin){
    return this.http.post<IRespuesta>(`${environment.url}/auth/login`, payload)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              name: resp.data.usuario.nombre,
              email: resp.data.usuario.correo,
              uid : resp.data.usuario.uid
            }
            localStorage.setItem('appToken', resp.data.token)
            console.log(this._usuario)
          }
        }),
        catchError(this.getError),
        delay(this.time)
      )
  }


  private getError(err: AjaxError) {
    console.warn('error en:', err.message)
    return of<IRespuesta>({
      ok: false,
      data: [],
      mensaje: 'Usuario / password no son correcto'
    })
  }
}


