import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ajax, AjaxError } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { catchError } from 'rxjs/operators'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'

@Injectable({
  providedIn: 'root'
})
export class DebitoService {



  constructor(private http: HttpClient) { }

  getRegistros(): Observable<any> {
    return this.http.get(`${environment.url}/debito?pagina=1`).pipe(
      catchError(this.getError)
    )
  }

  insertDebito(payload: DtoInsertDebito): Observable<any> {
    return this.http.post(`${environment.url}/debito/crear-registro`, payload).pipe(
      catchError(this.getError)
    )
  }

  private getError (err: AjaxError) {
    console.warn('error en:', err.message)
    return of<IRespuesta>({
      ok: false,
      data: [],
      mensaje: 'Ha ocurrido un problema con l o los registros'
    })
}
}
