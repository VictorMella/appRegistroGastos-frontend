import { Injectable } from '@angular/core'
import { IMenuItem } from '../interfaces/menuItem.interface'
import { IPagination } from '../interfaces/pagination.interface'
import { ITipoTransaccion } from '../interfaces/tipoTransaccion.interface'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  menuItems: IMenuItem[] = [
    {
      ruta: '/debito',
      nombre: 'Debito'
    },
    {
      ruta: '/credito',
      nombre: 'Credito'
    },
    {
      ruta: '/internacional',
      nombre: 'Internacional'
    }
  ]

  tipoTransaccion: ITipoTransaccion[] = [
    {
      id: 1, nombre: 'Efectivo'
    },
    {
      id: 2, nombre: 'Transferencia'
    }
  ];

  constructor() { }

  getMenu(): IMenuItem[] {
    return this.menuItems
  }

  getTipoTransaccion(): ITipoTransaccion[] {
    return this.tipoTransaccion
  }

  public setPagitation(currentPage: number, itemsPerPage: number, total: number): IPagination {
    return {
      currentPage,
      itemsPerPage,
      sizes: [10, 20, 50, 100],
      total
    };
  }
}
