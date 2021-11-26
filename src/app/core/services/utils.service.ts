import { Injectable } from '@angular/core'
import { IMenuItem } from '../interfaces/iMenuItem.interface'
import { IAnios, IMeses } from '../interfaces/iMesesAnios.interface'
import { IPagination } from '../interfaces/iPagination.interface'
import { ITipoTransaccion } from '../interfaces/tipoTransaccion.interface'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  anios: Array<IAnios> = [];
  anio: any;
  anioActual = new Date().getFullYear()

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

  meses: IMeses[] = [
    {
      id: 1, nombre: 'Enero'
    },
    {
      id: 2, nombre: 'Febrero'
    },
    {
      id: 3, nombre: 'Marzo'
    },
    {
      id: 4, nombre: 'Abril'
    },
    {
      id: 5, nombre: 'Mayo'
    },
    {
      id: 6, nombre: 'Junio'
    },
    {
      id: 7, nombre: 'Julio'
    },
    {
      id: 8, nombre: 'Agosto'
    },
    {
      id: 9, nombre: 'Septiembre'
    },
    {
      id: 10, nombre: 'Octubre'
    },
    {
      id: 11, nombre: 'Noviembre'
    },
    {
      id: 12, nombre: 'Diciembre'
    },
  ];

  constructor() {
    this.getYears()
  }

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

  private getYears(): void {
    const limiteAnios = 5
    let inicio = 0
    while (inicio <= limiteAnios) {
      this.anio = this.anioActual - inicio
      inicio += 1
      this.anios.push(this.anio)
    }
  }

  getLsYears(): Array<IAnios> {
    return this.anios
  }

  getLsMeses(): Array<IMeses> {
    return this.meses
  }
}
