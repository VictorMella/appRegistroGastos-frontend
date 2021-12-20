import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ajax, AjaxError } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { catchError, delay } from 'rxjs/operators'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { DtoDelete } from '../core/interfaces/DtoDelete.interface'
import { DtoEditDebito } from '../core/interfaces/DtoEditDebito.interface'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class OtrosGastosService {
  time: number
  idUsuarioCreacion: number
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private http: HttpClient,
              private authService: AuthService)  {
    this.time = 5
    this.idUsuarioCreacion = this.usuario.identificador
  }

  getRegistros(pagina: number, registrosPorPagina: number, mes: number, anio: number, idUsuarioCreacion: number): Observable<any> {
    return this.http.get(`${environment.url}/otros-gastos?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&mes=${mes}&anio=${anio}&idUsuarioCreacion=${idUsuarioCreacion}`).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  insertDebito(payload: DtoInsertDebito): Observable<any> {
    return this.http.post(`${environment.url}/otros-gastos/crear-registro`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  deleteDebito(payload: DtoDelete): Observable<any> {
    return this.http.post(`${environment.url}/otros-gastos/delete`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  editDebito(payload: DtoEditDebito): Observable<any> {
    return this.http.post(`${environment.url}/otros-gastos/update`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  private getError(err: AjaxError) {
    console.warn('error en:', err.message)
    return of<IRespuesta>({
      ok: false,
      data: [],
      mensaje: 'Ha ocurrido un problema, vuelva a intentar mas tarde'
    })
  }
}

