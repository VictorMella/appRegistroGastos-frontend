import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IMenuItem } from 'src/app/core/interfaces/iMenuItem.interface'
import { UtilsService } from 'src/app/core/services/utils.service'
import { MainFactoryService } from '../core/services/main-factory.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[]
  menuActivo: boolean
  constructor(private utilsService: UtilsService,
    private router: Router,
    private mainFactory: MainFactoryService) {
    this.menuItems = this.utilsService.getMenu()
    this.menuActivo = true
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.mainFactory.cargarMenus$
      .subscribe((active) => {
        if (active) {
          this.verMenu()
        } else {
          this.verMenu()
        }
      })
  }

  verMenu() {
    const arrayUrl = ['/auth/login', '/auth/registro']
    let urlActual = window.location.pathname
    console.log(urlActual)
    this.menuActivo = arrayUrl.includes(urlActual)
    console.log(this.menuActivo)
  }
}
