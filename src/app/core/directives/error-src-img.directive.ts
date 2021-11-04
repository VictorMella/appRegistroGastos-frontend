import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[error-src-img]'
})
export class ErrorSrcImgDirective {

  @Input() type: string;
  constructor(
    private imgElement: ElementRef
  ) { }

  @HostListener('error')
  loadFallbackOnError(): void {
    const IMAGES = {
      user: './assets/images/default-user.png',
      client: './assets/images/default-client.png',
      product: './assets/images/default-product.png'
    };
    const element: HTMLImageElement = this.imgElement.nativeElement as HTMLImageElement;
    element.src = IMAGES[this.type];
  }
}
