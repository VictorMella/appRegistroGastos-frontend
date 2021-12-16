import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs/internal/Subscription'
import { filter, tap } from 'rxjs/operators'
import { IMenuItem } from 'src/app/core/interfaces/iMenuItem.interface'
import { UtilsService } from 'src/app/core/services/utils.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: IMenuItem[]
  menuActivo: boolean

  public subscriber: Subscription

  constructor(private utilsService: UtilsService,
    private router: Router) {
    this.menuItems = this.utilsService.getMenu()
    this.menuActivo = true
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.subscriber = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('The URL changed to: ' + event['url'])
      this.verMenu()
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
