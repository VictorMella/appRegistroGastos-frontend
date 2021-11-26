import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MainFactoryService {
  private cargarRegistroEdicion = new BehaviorSubject<boolean>(false);
  public cargarRegistroEdicion$ = this.cargarRegistroEdicion.asObservable()

  public activeCargarRegistroEdicion(active: boolean): void {
    this.cargarRegistroEdicion.next(active);
  }
}
