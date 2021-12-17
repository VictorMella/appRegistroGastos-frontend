import { ChangeDetectionStrategy, Component, OnInit , TemplateRef} from '@angular/core'
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
import { AuthService } from '../services/auth.service'
import { BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-tarjeta-debito',
  templateUrl: './tarjeta-debito.component.html',
  styleUrls: ['./tarjeta-debito.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TarjetaDebitoComponent implements OnInit {
  get usuario() {
    return this.authService.usuario;
  }

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
              private authService: AuthService,
              private bsModalService: BsModalService,

  ) {
    this.paginationSearch = this.utils.setPagitation(1, 10, 0)
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, utils.mesActual, utils.anioActual)
  }

  ngOnInit(): void { }

  onHandleChangePaginationSearch({ page, itemsPerPage }): void {
    this.loading = true
    this.paginationSearch.currentPage = page
    this.paginationSearch.itemsPerPage = itemsPerPage
    const year = this.mainFactory.getData('selectedYear')
    const mes = this.mainFactory.getData('selectedMonth')
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, year)
  }

  onHandleChangeCriterio({ mes, anio }): void {
    this.loading = true
    this.paginationSearch.currentPage = 1
    this.paginationSearch.itemsPerPage = 10
    this.getRegistros(this.paginationSearch.currentPage, this.paginationSearch.itemsPerPage, mes, anio)
  }

  getRegistros(pagina: number, registrosPorPagina: number , mes: number, anio: number) {
    this.loading = true
    this.debitoService.getRegistros(pagina, registrosPorPagina, mes, anio, this.usuario.identificador)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.registrosCreadosDebito = this.transformData(resp.data[0].registrosTDebito)
          this.totalGastado = resp.data[0].totalMontoMes
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

  onHandleBorrarRegistro({ _id }: IRegistrosCreados): void {
    const payload = {
      _id
    }
    this.debitoService.deleteDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success(resp.mensaje)
          this.mainFactory.activeAñosRegistros(true)
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

  onOpenModalConfirmationQuestion(modalTemplate: TemplateRef<any>): void {
    this.bsModalService.show(modalTemplate, {
      id: 1, // para poder levantar modal sobre modal se debe ir sumando un nivel.
      backdrop: true,
      class: 'modal-md',
    })
  }

  private crearRegistro($event): void {
    this.loadingCreandoRegistro = true
    const payload: DtoInsertDebito = this.getPayloadInsertDebito($event)
    this.debitoService.insertDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
          this.mainFactory.activeAñosRegistros(true)
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
        this.mainFactory.activeAñosRegistros(true)
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
      fechaCompra: this.datePipe.transform(formValue.fechaCompra, 'yyyy-MM-dd', 'es'),
      idUsuarioCreacion: this.usuario.identificador
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
