import { Injectable } from '@angular/core';
import { Producao } from '../domain/producao';
import { Talhao } from '../domain/talhao';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {

  prod: Producao[] = new Array();
  index: number = -1;
  chaveLocalStorage: string = 'producoes';

  constructor() { }

  getProducoes(){

    this.prod = [];

    if (localStorage.hasOwnProperty(this.chaveLocalStorage)) {
      this.prod = JSON.parse(localStorage.getItem(this.chaveLocalStorage));
    };

    return this.prod;
  }

  setProducoes(producoes){

    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(producoes));

  }

  createProducao(producao: Producao){

    this.prod = [];
    this.prod = this.getProducoes();
    this.prod.push(producao);
    this.setProducoes(this.prod);

    return this.prod;
  }

  editProducao(producao: Producao){

    this.prod = [];
    this.prod = this.getProducoes();

    this.index = this.prod.findIndex(prod => prod.codigo === producao.codigo)
    this.prod[this.index] = producao;

    this.setProducoes(this.prod);

    return this.prod;

  }

  deleteProducao(producao: Producao){

    this.prod = [];
    this.prod = this.getProducoes();

    this.index = this.prod.findIndex(prod => prod.codigo === producao.codigo)
    this.prod.splice(this.index, 1);

    this.setProducoes(this.prod);

    return this.prod;
  }

  calculaProdTalhao(talhao: Talhao){

    let producao: number = 0;

    this.prod = [];
    this.prod = this.getProducoes();

    for(let i=0; i<=this.prod.length; i++){
      if(this.prod[i]?.talhao?.codigo == talhao.codigo) {
        producao += Number(this.prod[i].quantidade);
      }
    }

    talhao.produtividade = producao;

    return talhao;

  }

}
