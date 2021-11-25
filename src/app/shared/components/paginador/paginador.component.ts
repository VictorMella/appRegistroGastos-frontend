import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IPagination } from 'src/app/core/interfaces/pagination.interface'

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.scss']
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() config: IPagination
  @Output() changePagination: EventEmitter<object> = new EventEmitter();
  gotoPage: string
  currentPage: number
  currentSize: number
  totalPages: number
  info: string
  currentPagination = { page: 0, itemsPerPage: 0 };
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue) {
      this._setInfo()
    }
  }

  ngOnInit(): void {
    this.currentPage = this.config.currentPage
    this.currentSize = this.config.itemsPerPage
    this.totalPages = Math.floor(this.config.total / this.currentSize) + 1
    this.currentPagination = { page: this.currentPage, itemsPerPage: this.currentSize }
    this._setInfo()
  }

  sizeChanged(e) {
    this.currentSize = e
    this.currentPage = 1
    this._setInfo()
    this.changePagination.emit(this._currentStatus())
  }
  pageChanged(e) {
    if (this.currentPagination.page !== e.page || this.currentPagination.itemsPerPage !== e.itemsPerPage) {

      this.currentPage = e.page
      this.currentSize = e.itemsPerPage
      this._setInfo()
      this.currentPagination = e
      this.changePagination.emit(e)
    }
  }
  keyupGoto(e) {
    if (e.which === 13) {
      this.goto()
    }
  }
  goto() {
    this.gotoPage = `${parseInt(this.gotoPage, 10) <= 0 ? 1 : parseInt(this.gotoPage, 10)}`
    this.currentPage = parseInt(this.gotoPage, 10)
    this.gotoPage = null
  }
  _setInfo() {
    this.totalPages = Math.floor(this.config.total / this.currentSize)
    this.totalPages += ((this.config.total / this.currentSize) - Math.floor(this.config.total / this.currentSize)) === 0 ? 0 : 1
    this.info = `Mostrando ${this.config.total} registro${this.config.total > 1 ? 's' : ''} `
    this.info += `en ${this.totalPages} página${this.totalPages > 1 ? 's' : ''}`
  }
  _currentStatus() {
    return { page: this.currentPage, itemsPerPage: this.currentSize }
  }
}
