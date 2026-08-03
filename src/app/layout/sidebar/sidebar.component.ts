import { Component, Input, OnInit } from '@angular/core';
import { MenuService, Menu } from '../../core/services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  myMenus: Menu[] = [];
  currentUrl = '';

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   this.currentUrl = event.urlAfterRedirects;
    // });

    this.menuService.getMyMenus().subscribe((menus) => {
      this.myMenus = menus;
    });
  }
}
