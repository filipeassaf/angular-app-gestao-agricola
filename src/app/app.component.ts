import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
      this.items = [
          {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:['/']},
          {label: 'Fazendas', icon: 'pi pi-fw pi-image', routerLink:['/fazendas']},
          {label: 'Talhões', icon: 'pi pi-fw pi-map', routerLink:['/talhoes']}
      ];

      this.activeItem = this.items[1];

  }

}
