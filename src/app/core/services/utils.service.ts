import { Injectable } from '@angular/core';
import { IMenuItem } from '../interfaces/menuItem.interface'

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

  constructor() { }

  getMenu() {
    return this.menuItems
  }
}
