import { Component, OnInit } from '@angular/core'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { IDebito } from '../core/interfaces/iDebito.interface'
import { add, format } from 'date-fns'
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
  registroSeleccionado: IRegistrosCreados = undefined

  constructor(public datePipe: DatePipe,
    private alert: AlertService,
    public utils: UtilsService,
    public mainFactory: MainFactoryService,
    private debitoService: DebitoService) {
    this.paginationSearch = this.utils.setPagitation(1, 10, 0)
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage)
  }

  ngOnInit(): void {

  }

  onHandleChangePaginationSearch({ page, itemsPerPage }): void {
    this.loading = true
    this.paginationSearch.currentPage = page
    this.paginationSearch.itemsPerPage = itemsPerPage
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage)
  }

  getRegistros(pagina: number, registrosPorPagina: number) {
    this.loading = true
    this.debitoService.getRegistros(pagina, registrosPorPagina)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.registrosCreadosDebito = resp.data[0].registrosTDebito
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
    this.loadingCreandoRegistro = true
    const payload: DtoInsertDebito = this.getPayloadInsertDebito($event)
    this.debitoService.insertDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
          this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage)
        } else {
          this.alert.error(resp.mensaje)
        }
        this.loadingCreandoRegistro = false
      }, error => {
        console.log(error)
        this.loadingCreandoRegistro = false
      })
  }

  onHandleEditarRegistro($event: IRegistrosCreados): void {
    this.idRegistroSeleccionado = $event._id
    this.registroSeleccionado = $event
    this.mainFactory.activeCargarRegistroEdicion(true)
    // const payload: DtoEditDebito = this.getPayloadEditDebito($event)
    // this.debitoService.editDebito(payload)
    // .subscribe((resp: IRespuesta) => {
    //   if (resp.ok) {
    //     this.alert.success(resp.mensaje)
    //   } else {
    //     this.alert.error(resp.mensaje)
    //   }
    //   this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage)
    // }, error => {
    //   console.log(error)
    // })
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
        this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage)
      }, error => {
        console.log(error)
      })
  }

  private getPayloadInsertDebito(formValue: IDebito ): DtoInsertDebito {
    return {
      monto: formValue.monto,
      tipo: formValue.tipoTransaccion?.nombre,
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fachaCompra, 'yyyy-MM-dd', 'es')
    }
  }

  private getPayloadEditDebito(formValue: IDebito ): DtoEditDebito {
    return {
      _id: null,
      monto: formValue.monto,
      tipo: formValue.tipoTransaccion?.nombre,
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fachaCompra, 'yyyy-MM-dd', 'es')
    }
  }

}
