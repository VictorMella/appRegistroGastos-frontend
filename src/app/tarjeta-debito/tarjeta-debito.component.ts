import { Component, OnInit } from '@angular/core'
import { DtoInsertDebito } from '../core/interfaces/DtoInsertDebito.interface'
import { IDebito } from '../core/interfaces/iDebito.interface'
import { add, format } from 'date-fns'
import { DatePipe } from '@angular/common'
import { DebitoService } from '../services/debito.service'
import { AlertService } from '../core/services/alert.service'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { IRegistrosCreados } from '../core/interfaces/IRegistrosCreados.interface'
import { IPagination } from '../core/interfaces/pagination.interface'
import { UtilsService } from '../core/services/utils.service'

@Component({
  selector: 'app-tarjeta-debito',
  templateUrl: './tarjeta-debito.component.html',
  styleUrls: ['./tarjeta-debito.component.scss'],
  providers: [DatePipe]
})
export class TarjetaDebitoComponent implements OnInit {

  creandoRegistro: boolean
  registrosCreadosDebito: Array<IRegistrosCreados> = []
  paginationSearchSupplier: IPagination

  constructor(public datePipe: DatePipe,
              private alert: AlertService,
              public utils: UtilsService,
              private debitoService: DebitoService)
  {
    this.getRegistros()
  }

  ngOnInit(): void {

  }

  onHandleChangePaginationSearchSupplier({ page, itemsPerPage }): void {
    this.paginationSearchSupplier.currentPage = page
    this.paginationSearchSupplier.itemsPerPage = itemsPerPage
    this.getRegistros()
  }

  getRegistros() {
    this.debitoService.getRegistros()
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          console.log(resp.data)
          this.registrosCreadosDebito = resp.data[0].registrosTDebito
          this.paginationSearchSupplier = this.utils.setPagitation(1, 10, 0)
          this.paginationSearchSupplier.total = resp.data[0].totalRegistros
        } else {
          this.registrosCreadosDebito = []
          console.log(resp.data)
          this.alert.error(resp.mensaje)
        }
      }, error => {
        console.log(error)
        this.creandoRegistro = false
      })
  }

  onHandleCrearRegistro($event): any {
    this.creandoRegistro = true
    const payload: DtoInsertDebito = this.getPayloadInsertDebito($event)
    this.debitoService.insertDebito(payload)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.alert.success('Registro creado')
        } else {
          this.alert.error(resp.mensaje)
        }
        this.creandoRegistro = false
      }, error => {
        console.log(error)
        this.creandoRegistro = false
      })
  }

  private getPayloadInsertDebito(formValue: IDebito): DtoInsertDebito {
    return {
      monto: formValue.monto,
      tipo: formValue.tipoTransaccion?.nombre,
      descripcion: formValue.descripcion,
      fechaCompra: this.datePipe.transform(formValue.fachaCompra, 'yyyy-MM-dd', 'es')
    }
  }

}
