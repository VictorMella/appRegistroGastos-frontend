import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastr: ToastrService
  ) { }


  public success(message: string, timeOut: number = 5000): void {
    this.toastr.success(message, '', {
      timeOut
    });
  }

  public error(message: string, timeOut: number = 5000): void {
    this.toastr.error(message, '', {
      timeOut
    });
  }
}
