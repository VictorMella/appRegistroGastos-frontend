import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { DtoEditCredito } from '../core/interfaces/DtoEditCredito.interface'
import { DtoEditDebito } from '../core/interfaces/DtoEditDebito.interface'
import { DtoInsertCredito } from '../core/interfaces/DtoInsertCredito.interface'
import { ICredito } from '../core/interfaces/iCredito.interface'
import { IDebito } from '../core/interfaces/iDebito.interface'
import { IPagination } from '../core/interfaces/iPagination.interface'
import { IRegistrosCreados } from '../core/interfaces/IRegistrosCreados.interface'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { AlertService } from '../core/services/alert.service'
import { MainFactoryService } from '../core/services/main-factory.service'
import { UtilsService } from '../core/services/utils.service'
import { AuthService } from '../services/auth.service'
import { CreditoNacService } from '../services/credito-nac.service'


@Component({
  selector: 'app-tarjeta-credito-nac',
  templateUrl: './tarjeta-credito-nac.component.html',
  styleUrls: ['./tarjeta-credito-nac.component.scss']
})
export class TarjetaCreditoNacComponent implements OnInit {
  get usuario() {
    return this.authService.usuario;
  }

  loadingCreandoRegistro: boolean
  registrosCreadosCredito: Array<IRegistrosCreados> = []
  paginationSearch: IPagination
  loading: boolean
  idRegistroSeleccionado: string
  registroSeleccionadoEdicion: IRegistrosCreados
  totalGastado: number
  registrosNacionales: boolean

  constructor(public datePipe: DatePipe,
              private alert: AlertService,
              public utils: UtilsService,
              public mainFactory: MainFactoryService,
              private creditNacService: CreditoNacService,
              private authService: AuthService,

  ) {
    this.paginationSearch = this.utils.setPagitation(1, 10, 0)
    this.registrosNacionales= true
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, utils.mesActual, utils.anioActual, this.registrosNacionales)
  }

  ngOnInit(): void {
  }

  onHandleChangePaginationSearch({ page, itemsPerPage }): void {
    this.loading = true
    this.paginationSearch.currentPage = page
    this.paginationSearch.itemsPerPage = itemsPerPage
    const year = this.mainFactory.getData('selectedYear')
    const mes = this.mainFactory.getData('selectedMonth')
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year, this.registrosNacionales)
  }

  onHandleChangeCriterio({ mes, anio }): void {
    this.loading = true
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, anio, this.registrosNacionales)
  }

  getRegistros(pagina: number, registrosPorPagina: number , mes: number, anio: number, registrosNacionales: boolean) {
    this.loading = true
    this.creditNacService.getRegistros(pagina, registrosPorPagina, mes, anio, registrosNacionales, this.usuario.identificador)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.registrosCreadosCredito = this.transformData(resp.data[0].registrosTCredito)
          this.totalGastado = resp.data[0].totalMontoMes
          this.paginationSearch.total = resp.data[0].totalRegistros
        } else {
          this.registrosCreadosCredito = []
          this.alert.error(resp.mensaje)
        }
        this.loading = false
      }, error => {
        console.log(error)
        this.loading = false
      })
  }

  onHandleCrearRegistro($event): any {
    if (this.idRegistroSeleccionado) {
      this.editarRegistro($event)
    } else {
      this.crearRegistro($event)
    }
  }

  onHandleLimpiarRegistroSeleccionado(): void {
    this.idRegistroSeleccionado = null
  }

  onHandleSeleccionarRegistro($event: IRegistrosCreados): any {
    this.idRegistroSeleccionado = $event._id
    this.mainFactory.setData('registroSeleccionadoEdicion', $event)
    this.mainFactory.activeCargarRegistroEdicion(true)
  }

  onHandleBorrarRegistro({ _id, identificador }: IRegistrosCreados): void {
    const payload = {
      _id,
      identificador
    }
    this.creditNacService.deleteCredito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success(resp.mensaje)
          const year = this.mainFactory.getData('selectedYear')
          const mes = this.mainFactory.getData('selectedMonth')
          this.mainFactory.activeAñosRegistros(true)
          this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year, this.registrosNacionales)
        } else {
          this.alert.error(resp.mensaje)
        }
      }, error => {
        console.log(error)
      })
  }

  private crearRegistro($event): void {
    this.loadingCreandoRegistro = true
    const payload: DtoInsertCredito = this.getPayloadInsertCredito($event)
    this.creditNacService.insertCredito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
          this.mainFactory.activeAñosRegistros(true)
          const year = this.mainFactory.getData('selectedYear')
          const mes = this.mainFactory.getData('selectedMonth')
          this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year, this.registrosNacionales)
        } else {
          this.alert.error(resp.mensaje)
        }
        this.loadingCreandoRegistro = false
      }, error => {
        console.log(error)
        this.loadingCreandoRegistro = false
      })
  }

  private editarRegistro($event): void {
    const payload: DtoEditCredito = this.getPayloadEditDebito($event)
    this.creditNacService.editCredito(payload)
    .subscribe((resp: IRespuesta) => {
      if (resp.ok) {
        this.alert.success(resp.mensaje)
        this.idRegistroSeleccionado = null
        const year = this.mainFactory.getData('selectedYear')
        const mes = this.mainFactory.getData('selectedMonth')
        this.mainFactory.activeAñosRegistros(true)
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year, this.registrosNacionales)
      } else {
        this.alert.error(resp.mensaje)
      }
    }, error => {
      console.log(error)
    })
  }

  private getPayloadInsertCredito(formValue: ICredito ): DtoInsertCredito {
    return {
      monto: formValue.monto,
      tipo: 'Compras',
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fechaCompra, 'yyyy-MM-dd', 'es'),
      facturacionInmediata: formValue.facturacionInmediata,
      cuotas: formValue.cuotas,
      nacional: true,
      idUsuarioCreacion: this.usuario.identificador
    }
  }

  private getPayloadEditDebito(formValue: ICredito ): DtoEditCredito {
    return {
      _id: this.idRegistroSeleccionado,
      monto: formValue.monto,
      tipo: 'Compras',
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fechaCompra, 'yyyy-MM-dd', 'es'),
      facturacionInmediata: null,
      cuotas: 1
    }
  }

  private transformData(data: any): Array<IRegistrosCreados> {
    const lsMeses = this.utils.getLsMeses()
    const lsRegistros = data.map(item => {
      item.nombreMes = lsMeses.filter(m => m.id === item.mes)[0].nombre
      return item
    })
    return lsRegistros
  }

}
