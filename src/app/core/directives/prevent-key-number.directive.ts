import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[prevent-key-number]'
})
export class PreventKeyNumberDirective {

  @HostListener('keydown', ['$event']) preventKey(event: any): void {
    if (['e','E', '-', '+'].includes(event.key)) {
      event.preventDefault();
    }
  }



}
