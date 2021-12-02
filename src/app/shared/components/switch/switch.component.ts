import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {

  @Input() active: boolean;
  @Input() disable: boolean;
  @Input() activeLoading: boolean;
  @Output() handleToggleSwitch: EventEmitter<object> = new EventEmitter();
  constructor() { }

  onToggleSwitch(): void {
    if (!this.disable) {
      this.active = !this.active;
      this.handleToggleSwitch.emit({ active: this.active });
    }
  }

}
