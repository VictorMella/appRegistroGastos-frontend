import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IAnios, IMeses } from 'src/app/core/interfaces/iMesesAnios.interface'
import { IRespuesta } from 'src/app/core/interfaces/iRespuesta.interface'
import { MainFactoryService } from 'src/app/core/services/main-factory.service'
import { UtilsService } from 'src/app/core/services/utils.service'

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.scss']
})
export class FiltroBusquedaComponent implements OnInit {
  meses: Array<IMeses> = []
  years: any = []
  selectedMonth: number
  selectedYear: number
  cargaAños: boolean

  @Input() loading: boolean
  @Input() service: string
  @Output() handleChangeCriterio: EventEmitter<any> = new EventEmitter()

  constructor(private utilsService: UtilsService,
    private mainFactory: MainFactoryService) {
    this.meses = utilsService.getLsMeses()
    this.getYearsDebito()
    this.cargaAños = false
    this.selectedMonth = utilsService.mesActual
    this.mainFactory.setData('selectedMonth', this.selectedMonth)
  }

  ngOnInit(): void {
    this.mainFactory.cargarAñosRegistros$
      .subscribe((active) => {
        if (active) {
           this.getYears()
        }
      })
      this.getYears()
  }

  getYearsDebito() {
    this.utilsService.getYearsDebito()
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.years = resp.data
          if (this.years.length === 1) {
            this.selectedYear = this.years[0]
          } else {
            this.selectedYear = this.utilsService.anioActual
          }
          this.mainFactory.setData('selectedYear', this.selectedYear)
          if (this.cargaAños) {
            this.onSearchCriterio()
          }
        }
      }, error => {
        console.log(error)
      })
  }
  getYearsCredito() {
    const registrosNacionales = this.service === 'nacional'
    this.utilsService.getYearsCredito(registrosNacionales)
      .subscribe((resp: IRespuesta) => {
        if (resp.ok) {
          this.years = resp.data
          if (this.years.length === 1) {
            this.selectedYear = this.years[0]
          } else {
            this.selectedYear = this.utilsService.anioActual
          }
          this.mainFactory.setData('selectedYear', this.selectedYear)
          if (this.cargaAños) {
            this.onSearchCriterio()
          }
        }
      }, error => {
        console.log(error)
      })
  }

  onSearchCriterio(): void {
    this.cargaAños = false
    this.mainFactory.setData('selectedMonth', this.selectedMonth)
    this.mainFactory.setData('selectedYear', this.selectedYear)
    this.handleChangeCriterio.emit({ mes: this.selectedMonth, anio: this.selectedYear })
  }

  private getYears(): void {
    if (this.service === 'debito') {
      this.getYearsDebito()
    } else {
      this.getYearsCredito()
    }
    this.cargaAños = true
    this.years = []
  }
}
