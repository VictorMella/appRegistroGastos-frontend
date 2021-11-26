import { Directive, HostListener, Input, Output, Renderer2, EventEmitter, ElementRef, AfterViewInit} from '@angular/core';
import { SortDirection, ISortDirection } from '../interfaces/iSortDirection.interface';


@Directive({
  selector: '[sortable-column]'
})
export class SortableColumnDirective implements AfterViewInit {
  rotate: object;

  @Input() sortable: string;
  @Input() active: boolean;
  @Input() direction: SortDirection;
  @Input() content: string;
  @Output() sort: EventEmitter<ISortDirection> = new EventEmitter();
  @HostListener('click', ['$event.target']) selectColumn(target: any): void {
    this.direction = this.rotate[this.direction];
    this._reRender(target);
    this.sort.emit({
      column: this.sortable,
      direction: this.direction
    });
  }

  constructor(
    private render: Renderer2,
    private el: ElementRef,
  ) {
    this.active = false;
    this.direction = '';
    this.rotate = { asc: 'desc', desc: 'asc', '': 'asc' };
  }

  ngAfterViewInit(): void {
    const sortableContent: HTMLElement = this.render.createElement('span');
    sortableContent.classList.add('sortable-content');
    sortableContent.innerText = this.content;
    const wrapIcon: HTMLElement = this.render.createElement('span');
    if (this.direction === '') {
      wrapIcon.classList.add('wrap-icon');
    } else {
      wrapIcon.classList.add('wrap-icon', this.direction);
    }
    sortableContent.appendChild(wrapIcon);
    this.render.appendChild(this.el.nativeElement, sortableContent);

    if (this.active) {
      this.render.addClass(this.el.nativeElement, 'active');
    }
  }

  private _reRender(target): void {
    const containerColumn = target.parentNode.parentNode.querySelectorAll('.wrap-icon');
    const targetActive = target.parentNode.parentNode.querySelector('[sortable-column].active');
    containerColumn.forEach(item => {
      item.classList.remove('desc', 'asc');
    });

    if (target.classList.value.includes('sortable-content')) {
      targetActive.classList.remove('active');
      target.parentNode.classList.add('active');
      target.children[0].classList.add(this.direction);
    } else if (target.classList.value.includes('wrap-icon')) {
      target.parentNode.parentNode.classList.add('active');
      target.parentNode.children[0].classList.add(this.direction);
    }
  }
}

/*
  style required fort sortable-column directive

  th[sortable-column] {
    .sortable-content {
      display: flex;
      justify-content: center;
      cursor: pointer;

      .wrap-icon {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &::before,
        &::after {
          margin-bottom: 2px;
          line-height: 5px;
          opacity: 0.3;
        }

        &::before {
          font-family: "Font Awesome 5 Pro";
          content: "\f0d8";
        }

        &::after {
          font-family: "Font Awesome 5 Pro";
          content: "\f0d7";
        }

        &.asc::before,
        &.desc::after {
          opacity: 1;
        }
      }
    }
    &.active {
      background-color: #8dc0db40;
    }
  }
*/
