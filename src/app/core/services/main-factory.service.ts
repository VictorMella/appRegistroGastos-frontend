import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MainFactoryService {
  private cargarRegistroEdicion = new BehaviorSubject<boolean>(false);
  public cargarRegistroEdicion$ = this.cargarRegistroEdicion.asObservable()

  private cargarAñosRegistros = new BehaviorSubject<boolean>(false);
  public cargarAñosRegistros$ = this.cargarAñosRegistros.asObservable()

  private limpiarFormulario = new BehaviorSubject<boolean>(false);
  public limpiarFormularios$ = this.limpiarFormulario.asObservable()

  private data: object = {};

  public activeCargarRegistroEdicion(active: boolean): void {
    this.cargarRegistroEdicion.next(active);
  }

  public activeAñosRegistros(active: boolean): void {
    this.cargarAñosRegistros.next(active);
  }

  public onLimpiarFormulario(active: boolean): void {
    this.limpiarFormulario.next(active);
  }

  public setData(type: string, data: any): void {
    this.data[type] = data;
  }

  public getData(type: string): any {
    return this.data[type];
  }
}
