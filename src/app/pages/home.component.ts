import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
      this.items = [
          {label: 'Fazendas', icon: 'pi pi-fw pi-image', routerLink:['/fazendas']},
          {label: 'Talhões', icon: 'pi pi-fw pi-map', routerLink:['/talhoes']},
          {label: 'Produções', icon: 'pi pi-chart-line', routerLink:['/producoes']}
      ];

  }

}
