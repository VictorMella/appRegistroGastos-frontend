import { Component, OnInit } from '@angular/core'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { IDebito } from '../core/interfaces/iDebito.interface'
import { DatePipe } from '@angular/common'
import { DebitoService } from '../services/debito.service'
import { AlertService } from '../core/services/alert.service'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { IRegistrosCreados } from '../core/interfaces/IRegistrosCreados.interface'
import { IPagination } from '../core/interfaces/iPagination.interface'
import { UtilsService } from '../core/services/utils.service'
import { DtoEditDebito } from '../core/interfaces/DtoEditDebito.interface'
import { MainFactoryService } from '../core/services/main-factory.service'

@Component({
  selector: 'app-tarjeta-debito',
  templateUrl: './tarjeta-debito.component.html',
  styleUrls: ['./tarjeta-debito.component.scss'],
  providers: [DatePipe]
})
export class TarjetaDebitoComponent implements OnInit {

  loadingCreandoRegistro: boolean
  registrosCreadosDebito: Array<IRegistrosCreados> = []
  paginationSearch: IPagination
  loading: boolean
  idRegistroSeleccionado: string
  registroSeleccionadoEdicion: IRegistrosCreados
  totalGastado: number

  constructor(public datePipe: DatePipe,
              private alert: AlertService,
              public utils: UtilsService,
              public mainFactory: MainFactoryService,
              private debitoService: DebitoService,

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
  onHandleChangeCriterio({  mes, anio }): void {
    this.loading = true
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, anio)
  }

  getRegistros(pagina: number, registrosPorPagina: number , mes: number, anio: number) {
    this.loading = true
    this.debitoService.getRegistros(pagina, registrosPorPagina, mes, anio)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.registrosCreadosDebito = this.transformData(resp.data[0].registrosTDebito)
          this.totalGastado = this.registrosCreadosDebito.reduce((acc, curr) => acc + curr.monto, 0)
          this.paginationSearch.total = resp.data[0].totalRegistros
        } else {
          this.registrosCreadosDebito = []
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
    this.debitoService.deleteDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success(resp.mensaje)
        } else {
          this.alert.error(resp.mensaje)
        }
        const year = this.mainFactory.getData('selectedYear')
        const mes = this.mainFactory.getData('selectedMonth')
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year)
      }, error => {
        console.log(error)
      })
  }

  private crearRegistro($event): void {
    this.loadingCreandoRegistro = true
    const payload: DtoInsertDebito = this.getPayloadInsertDebito($event)
    this.debitoService.insertDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
          const year = this.mainFactory.getData('selectedYear')
          const mes = this.mainFactory.getData('selectedMonth')
          this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year)
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
    const payload: DtoEditDebito = this.getPayloadEditDebito($event)
    this.debitoService.editDebito(payload)
    .subscribe((resp: IRespuesta) => {
      if (resp.ok) {
        this.alert.success(resp.mensaje)
        this.idRegistroSeleccionado = null
        const year = this.mainFactory.getData('selectedYear')
        const mes = this.mainFactory.getData('selectedMonth')
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year)
      } else {
        this.alert.error(resp.mensaje)
      }
    }, error => {
      console.log(error)
    })
  }

  private getPayloadInsertDebito(formValue: IDebito ): DtoInsertDebito {
    return {
      monto: formValue.monto,
      tipo: formValue.tipoTransaccion?.nombre,
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fechaCompra, 'yyyy-MM-dd', 'es')
    }
  }

  private getPayloadEditDebito(formValue: IDebito ): DtoEditDebito {
    return {
      _id: this.idRegistroSeleccionado,
      monto: formValue.monto,
      tipo: formValue.tipoTransaccion?.nombre,
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fechaCompra, 'yyyy-MM-dd', 'es')
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
