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
import { CreditoNacService } from '../services/credito-nac.service'


@Component({
  selector: 'app-tarjeta-credito-nac',
  templateUrl: './tarjeta-credito-nac.component.html',
  styleUrls: ['./tarjeta-credito-nac.component.scss']
})
export class TarjetaCreditoNacComponent implements OnInit {
  loadingCreandoRegistro: boolean
  registrosCreadosCredito: Array<IRegistrosCreados> = []
  paginationSearch: IPagination
  loading: boolean
  idRegistroSeleccionado: string
  registroSeleccionadoEdicion: IRegistrosCreados
  totalGastado: number

  constructor(public datePipe: DatePipe,
              private alert: AlertService,
              public utils: UtilsService,
              public mainFactory: MainFactoryService,
              private creditNacService: CreditoNacService,

  ) {
    this.paginationSearch = this.utils.setPagitation(1, 10, 0)
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, utils.mesActual, utils.anioActual)
  }

  ngOnInit(): void {

  }

  onHandleChangePaginationSearch({ page, itemsPerPage, mes, anio }): void {
    this.loading = true
    this.paginationSearch.currentPage = page
    this.paginationSearch.itemsPerPage = itemsPerPage
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, anio)
  }

  onHandleChangeCriterio({ mes, anio }): void {
    this.loading = true
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, anio)
  }

  getRegistros(pagina: number, registrosPorPagina: number , mes: number, anio: number) {
    this.loading = true
    this.creditNacService.getRegistros(pagina, registrosPorPagina, mes, anio)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.registrosCreadosCredito = this.transformData(resp.data[0].registrosTCredito)
          this.totalGastado = this.registrosCreadosCredito.reduce((acc, curr) => acc + curr.monto, 0)
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

  onHandleBorrarRegistro(id: string): void {
    const payload = {
      _id: id
    }
    this.creditNacService.deleteDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success(resp.mensaje)
        } else {
          this.alert.error(resp.mensaje)
        }
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, 0, 0)
      }, error => {
        console.log(error)
      })
  }

  private crearRegistro($event): void {
    this.loadingCreandoRegistro = true
    const payload: DtoInsertCredito = this.getPayloadInsertCredito($event)
    this.creditNacService.insertDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
          this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, 0, 0)
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
    this.creditNacService.editDebito(payload)
    .subscribe((resp: IRespuesta) => {
      if (resp.ok) {
        this.alert.success(resp.mensaje)
        this.idRegistroSeleccionado = null
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, 0, 0)
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
      cuotas: formValue.cuotas
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
