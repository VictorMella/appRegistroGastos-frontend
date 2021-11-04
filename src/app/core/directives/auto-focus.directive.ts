import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[auto-focus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(
    private element: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
