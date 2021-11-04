import { Injectable } from '@angular/core';
import { IMenuItem } from '../interfaces/menuItem.interface'
import { ITipoTransaccion } from '../interfaces/tipoTransaccion.interface'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  menuItems: IMenuItem[] = [
    {
      ruta: '/debito/crear-registro',
      nombre: 'Debito'
    },
    {
      ruta: '/credito/crear-registro',
      nombre: 'Credito'
    },
    {
      ruta: '/internacional/crear-registro',
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
  ]

  constructor() { }

  getMenu() {
    return this.menuItems
  }

  getTipoTransaccion() {
    return this.tipoTransaccion
  }
}
