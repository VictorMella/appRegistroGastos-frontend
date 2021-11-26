import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRegistrosCreados } from 'src/app/core/interfaces/IRegistrosCreados.interface'
import { IPagination } from 'src/app/core/interfaces/iPagination.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { IAnios, IMeses } from 'src/app/core/interfaces/iMesesAnios.interface'

@Component({
  selector: 'app-visualizar-registro',
  templateUrl: './visualizar-registro.component.html',
  styleUrls: ['./visualizar-registro.component.scss']
})
export class VisualizarRegistroComponent implements OnInit {
  meses: Array<IMeses> = []
  years: Array<IAnios> = []
  selectedMonth: number
  selectedYear: number

  @Input() registrosCreados: Array<IRegistrosCreados> = []
  @Input() pagination: IPagination;
  @Input() loading: boolean;
  @Output() handleChangePagination: EventEmitter<any> = new EventEmitter();

  constructor(private utilsService: UtilsService,) {
    this.meses = utilsService.getLsMeses()
    this.years = utilsService.getLsYears()
    this.selectedYear = utilsService.anioActual
   }

  ngOnInit(): void {
  }

  onChangePagination({ page, itemsPerPage }): void {
    this.handleChangePagination.emit({ page, itemsPerPage });
  }

}
