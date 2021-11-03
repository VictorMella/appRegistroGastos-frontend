import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/core/interfaces/menuItem.interface'
import { UtilsService } from '../core/services/utils.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[]

  constructor(private utilsService: UtilsService) {
    this.menuItems = this.utilsService.getMenu()
   }

  ngOnInit(): void {

  }

}
