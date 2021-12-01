import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MainFactoryService {
  private cargarRegistroEdicion = new BehaviorSubject<boolean>(false);
  public cargarRegistroEdicion$ = this.cargarRegistroEdicion.asObservable()
  private data: object = {};

  public activeCargarRegistroEdicion(active: boolean): void {
    this.cargarRegistroEdicion.next(active);
  }

  public setData(type: string, data: any): void {
    this.data[type] = data;
  }

  public getData(type: string): any {
    return this.data[type];
  }
}
