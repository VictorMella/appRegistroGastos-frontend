import { Component, OnInit, Input, Inject, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader.service'

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss']
})
export class GlobalLoaderComponent implements OnInit, OnChanges {
  text = 'Cargando...';
  show = false;
  fullCenter = true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private loaderService: LoaderService
    ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.validateRender(changes.show.currentValue);
  }

  ngOnInit(): void {
    this.loaderService.loader.subscribe((data: any) => {
      this.show = data.show;
      this.text = data.text;
      this.validateRender(this.show);
    });
  }

  validateRender(currentShow): void{
    if (currentShow){
      this.renderer.addClass(this.document.body, 'no-scroll');
    }else{
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

}
