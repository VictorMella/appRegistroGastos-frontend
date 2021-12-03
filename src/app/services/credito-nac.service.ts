import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ajax, AjaxError } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { catchError, delay } from 'rxjs/operators'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { DtoDelete } from '../core/interfaces/DtoDelete.interface'
import { DtoInsertCredito } from '../core/interfaces/DtoInsertCredito.interface'
import { DtoEditCredito } from '../core/interfaces/DtoEditCredito.interface'

@Injectable({
  providedIn: 'root'
})
export class CreditoNacService {

  time: number

  constructor(private http: HttpClient) {
    this.time = 500
  }

  getRegistros(pagina: number, registrosPorPagina: number, mes: number, anio: number): Observable<any> {
    return this.http.get(`${environment.url}/credito?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&mes=${mes}&anio=${anio}`).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  insertDebito(payload: DtoInsertCredito): Observable<any> {
    return this.http.post(`${environment.url}/credito/crear-registro`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  deleteDebito(payload: DtoDelete): Observable<any> {
    return this.http.post(`${environment.url}/credito/delete`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  editDebito(payload: DtoEditCredito): Observable<any> {
    return this.http.post(`${environment.url}/credito/update`, payload).pipe(
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
