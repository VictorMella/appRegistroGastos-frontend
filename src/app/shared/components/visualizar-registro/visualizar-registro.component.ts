import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IRegistrosCreados } from 'src/app/core/interfaces/IRegistrosCreados.interface'
import { IPagination } from 'src/app/core/interfaces/iPagination.interface'

@Component({
  selector: 'app-visualizar-registro',
  templateUrl: './visualizar-registro.component.html',
  styleUrls: ['./visualizar-registro.component.scss']
})
export class VisualizarRegistroComponent implements OnInit {

  @Input() registrosCreados: Array<IRegistrosCreados> = []
  @Input() pagination: IPagination
  @Input() loading: boolean
  @Input() totalGastado: number
  @Input() contexto: string
  @Output() handleChangePagination: EventEmitter<any> = new EventEmitter();
  @Output() handleChangeCriterio: EventEmitter<any> = new EventEmitter();
  @Output() handleSeleccionarRegistro: EventEmitter<any> = new EventEmitter();
  @Output() handleBorrarRegistro: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onChangePagination({ page, itemsPerPage }): void {
    this.handleChangePagination.emit({ page, itemsPerPage })
  }

  onEditarRegistro(item: IRegistrosCreados): void {
    this.handleSeleccionarRegistro.emit(item)
  }

  onBorrarRegistro({ _id }: IRegistrosCreados): void {
    this.handleBorrarRegistro.emit(_id)
  }

  onSearchCriterio({ mes, anio }): void {
    this.handleChangeCriterio.emit({ mes, anio })
  }
}
