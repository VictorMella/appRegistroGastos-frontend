import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() actionSuccess: string;
  @Input() actionDefault: string;
  @Input() nivel: number; // para poder levantar modal sobre modal se debe ir sumando un nivel.
  @Input() activeLoading: boolean;
  @Input() customClass: string;
  @Output() handleConfirmActionSuccess: EventEmitter<any> = new EventEmitter();
  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    console.log();
  }

  onCloseModal(): void {
    this.utils.closeModal(this.nivel)
  }

  onConfirmActionSuccess(): void {
    this.handleConfirmActionSuccess.emit();
  }

}
