import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { IMenuItem } from 'src/app/core/interfaces/iMenuItem.interface'
import { UtilsService } from '../core/services/utils.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[]

  constructor(private utilsService: UtilsService,
    private router: Router,) {
    this.menuItems = this.utilsService.getMenu()
   }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }

  onGoTo() {

  }

}
