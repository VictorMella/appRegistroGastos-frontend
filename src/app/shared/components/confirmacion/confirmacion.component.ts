import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-confirmacion',
    templateUrl: './confirmacion.component.html',
    styleUrls: ['./confirmacion.component.scss'],
    standalone: false
})
export class ConfirmacionComponent  {
  @Input() icon: string;
  @Input() question: string;
  constructor() { }
}
