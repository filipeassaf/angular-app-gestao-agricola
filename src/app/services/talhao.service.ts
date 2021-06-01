import { Injectable } from '@angular/core';
import { Fazenda } from '../domain/fazenda';
import { Talhao } from '../domain/talhao';

@Injectable({
  providedIn: 'root'
})
export class TalhaoService {

  tals: Talhao[] = new Array();
  index: number = -1;
  chaveLocalStorage: string = 'talhoes';

  constructor() { }

  getTalhoes(){

    this.tals = [];

    if (localStorage.hasOwnProperty(this.chaveLocalStorage)) {
      this.tals = JSON.parse(localStorage.getItem(this.chaveLocalStorage));
    };

    return this.tals;
  }

  setTalhoes(talhoes){

    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(talhoes));

  }

  createTalhao(talhao: Talhao){

    this.tals = [];
    this.tals = this.getTalhoes();
    this.tals.push(talhao);
    this.setTalhoes(this.tals);

    return this.tals;
  }

  editTalhao(talhao: Talhao){

    this.tals = [];
    this.tals = this.getTalhoes();

    this.index = this.tals.findIndex(tal => tal.codigo === talhao.codigo)
    this.tals[this.index] = talhao;

    this.setTalhoes(this.tals);

    return this.tals;

  }

  deleteTalhao(talhao: Talhao){

    this.tals = [];
    this.tals = this.getTalhoes();

    this.index = this.tals.findIndex(tal => tal.codigo === talhao.codigo)
    this.tals.splice(this.index, 1);

    this.setTalhoes(this.tals);

    return this.tals;
  }

  calculaProdFazenda(fazenda: Fazenda){

    let producao: number = 0;

    this.tals = [];
    this.tals = this.getTalhoes();

    for(let i=0; i<=this.tals.length; i++){
      if(this.tals[i]?.fazenda.codigo == fazenda.codigo) {
        producao += Number(this.tals[i].produtividade);
      }
    }

    fazenda.produtividade = producao;

    return fazenda;

  }

}
