
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { forkJoin, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { IRespuesta } from '../core/interfaces/iRespuesta.interface'
import { MainFactoryService } from '../core/services/main-factory.service'
import { UtilsService } from '../core/services/utils.service'
import { AuthService } from '../services/auth.service'
import { CreditoNacService } from '../services/credito-nac.service'
import { DebitoService } from '../services/debito.service'
import { OtrosGastosService } from '../services/otros-gastos.service'


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  get usuario() {
    return this.authService.usuario
  }
  loading: boolean
  totalGastadoOtrosIngreso: number
  totalGastadoOtrosEgreso: number
  totalGastadoDebito: number
  totalGastadoCreditoNac: number
  totalGastadoCreditoInter: number
  mesActual: string
  totalGastos: number
  constructor(private authService: AuthService,
    public utils: UtilsService,
    private otrosService: OtrosGastosService,
    private debitoService: DebitoService,
    private creditNacService: CreditoNacService,
    private mainFactory: MainFactoryService) {
    this.loading = true
    this.mesActual = utils.meses.filter(mes => mes.id === utils.mesActual)[0].nombre
    this.getAll()
  }
  ngOnInit(): void {

  }

  private getAll() {
    const $listObservables = forkJoin({
      otros: this.otrosService.getRegistros(1, 500, this.utils.mesActual, this.utils.anioActual, this.usuario.identificador),
      debito: this.debitoService.getRegistros(1, 500, this.utils.mesActual, this.utils.anioActual, this.usuario.identificador),
      nacional: this.creditNacService.getRegistros(1, 500, this.utils.mesActual, this.utils.anioActual, true, this.usuario.identificador),
      internacional: this.creditNacService.getRegistros(1, 500, this.utils.mesActual, this.utils.anioActual, false, this.usuario.identificador)
    })

    $listObservables.subscribe(resp => {
      this.totalGastadoOtrosIngreso = resp['otros'].data[0].otrosGastos.filter(item=> item.tipo === 'Ingreso').reduce((acc, curr) => acc + curr.monto, 0)
      this.totalGastadoOtrosEgreso = resp['otros'].data[0].otrosGastos.filter(item => item.tipo === 'Egreso').reduce((acc, curr) => acc + curr.monto, 0)
      this.totalGastadoDebito = resp['debito'].data[0].totalMontoMes
      this.totalGastadoCreditoNac = resp['nacional'].data[0].totalMontoMes
      this.totalGastadoCreditoInter = resp['internacional'].data[0].totalMontoMes
      this.totalGastos = this.totalGastadoOtrosIngreso - [this.totalGastadoOtrosEgreso, this.totalGastadoDebito, this.totalGastadoCreditoNac, this.totalGastadoCreditoInter].reduce((acc, curr) => acc + curr, 0)
      this.loading = false
    })
  }
}
