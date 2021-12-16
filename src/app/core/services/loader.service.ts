import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader = new Subject<{}>();
  constructor(  ) {  }

  setLoading(data: any): void {
    const fnDelay = new Observable(x => {
      x.next()
    }).pipe(delay(0)).subscribe(() => {
      this.loader.next(data)
      fnDelay.unsubscribe()
    })
  }
}
