import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ajax, AjaxError } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { catchError, delay } from 'rxjs/operators'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { DtoDeleteDebito } from '../core/interfaces/DtoDeleteDebito.interface'
import { DtoEditDebito } from '../core/interfaces/DtoEditDebito.interface'

@Injectable({
  providedIn: 'root'
})
export class DebitoService {
  time: number

  constructor(private http: HttpClient) {
    this.time = 500
  }

  getRegistros(pagina: number, registrosPorPagina: number, mes: number, anio: number): Observable<any> {
    return this.http.get(`${environment.url}/debito?pagina=${pagina}&registrosPorPagina=${registrosPorPagina}&mes=${mes}&anio=${anio}`).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  insertDebito(payload: DtoInsertDebito): Observable<any> {
    return this.http.post(`${environment.url}/debito/crear-registro`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  deleteDebito(payload: DtoDeleteDebito): Observable<any> {
    return this.http.post(`${environment.url}/debito/delete`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  editDebito(payload: DtoEditDebito): Observable<any> {
    return this.http.post(`${environment.url}/debito/update`, payload).pipe(
      catchError(this.getError),
      delay(this.time)
    )
  }

  private getError (err: AjaxError) {
    console.warn('error en:', err.message)
    return of<IRespuesta>({
      ok: false,
      data: [],
      mensaje: 'Ha ocurrido un problema, vuelva a intentar mas tarde'
    })
}
}
