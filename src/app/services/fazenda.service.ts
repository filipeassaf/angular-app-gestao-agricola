import { Injectable } from '@angular/core';
import { Fazenda } from '../domain/fazenda';

@Injectable({
  providedIn: 'root'
})
export class FazendaService {

  farms: Fazenda[] = new Array();
  index: number = -1;
  chaveLocalStorage: string = 'farms';

  constructor() { }

  getFazendas(){

    this.farms = [];

    if (localStorage.hasOwnProperty(this.chaveLocalStorage)) {
      this.farms = JSON.parse(localStorage.getItem(this.chaveLocalStorage));
    };

    return this.farms;
  }

  setFazendas(fazendas){

    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(fazendas));

  }

  createFazenda(fazenda: Fazenda){

    this.farms = [];
    this.farms = this.getFazendas();
    this.farms.push(fazenda);
    this.setFazendas(this.farms);

    return this.farms;
  }

  editFazenda(fazenda: Fazenda){

    this.farms = [];
    this.farms = this.getFazendas();

    this.index = this.farms.findIndex(farm => farm.codigo === fazenda.codigo)
    this.farms[this.index] = fazenda;

    this.setFazendas(this.farms);

    return this.farms;

  }

  deleteFazenda(fazenda: Fazenda){

    this.farms = [];
    this.farms = this.getFazendas();

    this.index = this.farms.findIndex(farm => farm.codigo === fazenda.codigo)
    this.farms.splice(this.index, 1);

    this.setFazendas(this.farms);

    return this.farms;
  }

}
