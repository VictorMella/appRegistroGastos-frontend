import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Registro de gastos';
  separators: any = {}
  constructor() {
    this.separators.decimalsSeparator = ','
    this.separators.thoudsandsSeparator = '.'
    sessionStorage.setItem('separators', JSON.stringify(this.separators));
  }
  onGoTo() {
    //this.scroller.scrollToAnchor("targetGreen");
    document.getElementById("userMenu").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

}
