import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainFactoryService } from 'src/app/core/services/main-factory.service'

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() active: boolean;
  @Input() disabled: boolean;
  @Input() activeLoading: boolean;
  @Output() handleToggleSwitch: EventEmitter<object> = new EventEmitter();
  constructor(public mainFactory: MainFactoryService) {

  }
  ngOnInit(): void {
    this.mainFactory.cargarRegistroEdicion$
    .subscribe((active) => {
      if (active) {
        this.active = false
      }
    })

  }
  onToggleSwitch(): void {
    if (!this.disabled) {
      this.active = !this.active;
      this.handleToggleSwitch.emit({ active: this.active });
    }
  }

}
