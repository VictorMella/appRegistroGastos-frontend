import { HttpClient } from '@angular/common/http'
import { Injectable, TemplateRef } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AjaxError } from 'rxjs/ajax'
import { catchError} from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { IMenuItem } from '../interfaces/iMenuItem.interface'
import { IAnios, IMeses } from '../interfaces/iMesesAnios.interface'
import { IPagination } from '../interfaces/iPagination.interface'
import { ITipoTransaccion } from '../interfaces/tipoTransaccion.interface'
import { IRespuesta } from '../interfaces/iRespuesta.interface'
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  anios: Array<IAnios> = [];
  anio: any;
  anioActual = new Date().getFullYear()
  mesActual = new Date().getMonth() + 1

  menuItems: IMenuItem[] = [
    {
      ruta: '/cuenta/debito',
      nombre: 'Debito'
    },
    {
      ruta: '/cuenta/credito',
      nombre: 'Credito'
    },
    {
      ruta: '/cuenta/internacional',
      nombre: 'Internacional'
    },
    {
      ruta: '/cuenta/otras',
      nombre: 'Otras'
    },
    {
      ruta: '/cuenta/resumen',
      nombre: 'Resumen'
    }
  ]

  menuUsuario: IMenuItem[] = [
    {
      ruta: '/auth/Login',
      nombre: 'Salir'
    },
    // {
    //   ruta: '/auth/registro',
    //   nombre: 'Editar datos'
    // },
  ]

  tipoTransaccion: ITipoTransaccion[] = [
    {
      id: 1, nombre: 'Compras', cuenta: 'debito'
    },
    {
      id: 2, nombre: 'Giros', cuenta: 'debito'
    },
    {
      id: 3, nombre: 'Pagos', cuenta: 'debito'
    },
    {
      id: 4, nombre: 'Transferencias', cuenta: 'debito'
    },
    {
      id: 5, nombre: 'Ingreso', cuenta: 'otros'
    },
    {
      id: 6, nombre: 'Egreso', cuenta: 'otros'
    }
  ];

  meses: IMeses[] = [
    {
      id: 1, nombre: 'Enero'
    },
    {
      id: 2, nombre: 'Febrero'
    },
    {
      id: 3, nombre: 'Marzo'
    },
    {
      id: 4, nombre: 'Abril'
    },
    {
      id: 5, nombre: 'Mayo'
    },
    {
      id: 6, nombre: 'Junio'
    },
    {
      id: 7, nombre: 'Julio'
    },
    {
      id: 8, nombre: 'Agosto'
    },
    {
      id: 9, nombre: 'Septiembre'
    },
    {
      id: 10, nombre: 'Octubre'
    },
    {
      id: 11, nombre: 'Noviembre'
    },
    {
      id: 12, nombre: 'Diciembre'
    },
  ];

  cuotas: Array<Number> = [
    1,3,6,12
  ]


  constructor(private http: HttpClient,
    private bsModalService: BsModalService,) {
  }

  getMenu(): IMenuItem[] {
    return this.menuItems
  }

  getOpciones(): IMenuItem[] {
    return this.menuUsuario
  }

  getTipoTransaccion(): ITipoTransaccion[] {
    return this.tipoTransaccion
  }

  getYearsDebito(idUsuarioCreacion: number): Observable<any> {
    return this.http.get(`${environment.url}/debito/anio?idUsuarioCreacion=${idUsuarioCreacion}`)
  }

  getYearsCredito(registrosNacionales: boolean, idUsuarioCreacion: number): Observable<any> {
    return this.http.get(`${environment.url}/credito/anio?registrosNacionales=${registrosNacionales}&idUsuarioCreacion=${idUsuarioCreacion}`)
  }

  getYearsOtros(idUsuarioCreacion: number): Observable<any> {
    return this.http.get(`${environment.url}/otros-gastos/anio?idUsuarioCreacion=${idUsuarioCreacion}`)
  }

  private getError(err: AjaxError) {
    console.warn('error en:', err.message)
    return of<IRespuesta>({
      ok: false,
      data: [this.anioActual],
      mensaje: 'Ha ocurrido un problema, vuelva a intentar mas tarde'
    })
  }

  public setPagitation(currentPage: number, itemsPerPage: number, total: number): IPagination {
    return {
      currentPage,
      itemsPerPage,
      sizes: [10, 20, 50, 100],
      total
    };
  }

  getLsYears(): Array<IAnios> {
    return this.anios
  }

  getLsMeses(): Array<IMeses> {
    return this.meses
  }

  getLsCuotas(): Array<Number> {
    return this.cuotas
  }

  public showModal(modalTemplate: TemplateRef<any>, config: ModalOptions): void {
    this.bsModalService.show(modalTemplate, { backdrop: false, ...config })
  }

  public closeModal(nivel?: number): void {
    this.bsModalService.hide(nivel);
    this.bsModalService.removeBackdrop()
  }
}
