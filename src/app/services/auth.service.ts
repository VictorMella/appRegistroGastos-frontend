import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, delay, map, tap } from 'rxjs/operators'
import { Usuario } from '../core/interfaces/iUsuario.interface'
import { environment } from 'src/environments/environment'
import { DtoLogin } from '../core/interfaces/Dtologin.interface'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { DtoCrearUsuario } from '../core/interfaces/DtoCrearUsuario.interface'

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

  registro(payload: DtoCrearUsuario): Observable<any> {
    return this.http.post<IRespuesta>(`${environment.url}/usuario/create`, payload)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('appToken', resp.data.token)
          }
        }),
        catchError(this.getError),
        delay(this.time)
      )
  }

  login(payload: DtoLogin): Observable<any> {
    return this.http.post<IRespuesta>(`${environment.url}/auth/login`, payload)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              name: resp.data.usuario.nombre,
              email: resp.data.usuario.correo,
              uid: resp.data.usuario.uid,
              identificador: resp.data.usuario.identificador,
            }
            localStorage.setItem('appToken', resp.data.token)
          }
        }),
        catchError(this.getError),
        delay(this.time)
      )
  }

  validarToken(): Observable<boolean> {
    const url = `${environment.url}/auth/renew`
    const headers = new HttpHeaders()
      .set('appToken', localStorage.getItem('appToken') || '')

    return this.http.get<any>(url, { headers })
      .pipe(
        map( resp => {
          localStorage.setItem('appToken', resp.data.token)
          this._usuario = {
            name: resp.data.usuario.nombre,
            email: resp.data.usuario.correo,
            uid: resp.data.usuario.uid,
            identificador: resp.data.usuario.identificador,
          }
          return resp.ok;
        }),
        catchError(this.getError)
      )
  }


  private getError(err: any) {
    console.warn('error en:', err.error.mensaje)
    return of<IRespuesta>({
      ok: false,
      data: [],
      mensaje: err.error.mensaje
    })
  }
}


