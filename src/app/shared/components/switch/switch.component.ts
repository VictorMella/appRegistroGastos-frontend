import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() active: boolean;
  @Input() disable: boolean;
  @Input() activeLoading: boolean;
  @Output() handleToggleSwitch: EventEmitter<object> = new EventEmitter();
  constructor() {

  }
  ngOnInit(): void { console.log(this.active)}
  onToggleSwitch(): void {
    if (!this.disable) {
      this.active = !this.active;
      this.handleToggleSwitch.emit({ active: this.active });
    }
  }

}
