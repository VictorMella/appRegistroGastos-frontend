import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[auto-focus]',
    standalone: false
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
