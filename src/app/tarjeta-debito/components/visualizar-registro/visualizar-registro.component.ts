import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRegistrosCreados } from 'src/app/core/interfaces/IRegistrosCreados.interface'
import { IPagination } from 'src/app/core/interfaces/pagination.interface'

@Component({
  selector: 'app-visualizar-registro',
  templateUrl: './visualizar-registro.component.html',
  styleUrls: ['./visualizar-registro.component.scss']
})
export class VisualizarRegistroComponent implements OnInit {
  @Input() registrosCreados: Array<IRegistrosCreados> = []
  @Input() pagination: IPagination;
  @Output() handleChangePagination: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.registrosCreados)
    console.log(this.pagination)
  }

  onChangePagination({ page, itemsPerPage }): void {
    this.handleChangePagination.emit({ page, itemsPerPage });
  }

}
