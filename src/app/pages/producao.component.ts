import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Fazenda } from '../domain/fazenda';
import { Producao } from '../domain/producao';
import { Talhao } from '../domain/talhao';
import { FazendaService } from '../services/fazenda.service';
import { ProducaoService } from '../services/producao.service';
import { TalhaoService } from '../services/talhao.service';
import { IdService } from '../shared/id.service';
import { FazendaComponent } from './fazenda.component';
import { TalhaoComponent } from './talhao.component';

@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.css']
})
export class ProducaoComponent implements OnInit {

  title = 'angular-software-gestao-agricola';

  dialogProducao: boolean;
  submitted: boolean;

  producao: Producao;
  producoes: Producao[] = [];

  talhao: Talhao;
  talhoes: Talhao[] = [];

  fazenda: Fazenda;
  fazendaProd: Fazenda;
  fazendas: Fazenda[] = [];

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private producaoService: ProducaoService,
              private talhaoService: TalhaoService,
              private fazendaService: FazendaService,
              private idService: IdService
              ) { }

  ngOnInit() {

    this.talhaoService.getTalhoes().forEach(tal => {
      this.talhoes.push(tal);
    });

    this.producaoService.getProducoes().forEach(prod => {
      this.producoes.push(prod);
    });

  }

  edit(producao: Producao){

    this.producao = {...producao};
    this.dialogProducao = true;
  }

  delete(producao: Producao){

    this.confirmationService.confirm({
      message: 'Deseja excluir o registro: ' + producao.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
      {
        this.producoes = [];

        this.producaoService.deleteProducao(producao).forEach(prod => {
          this.producoes.push(prod);
        });

        this.producoes = [...this.producoes];

        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção Excluído', life: 3000});
      }
    })


  }

  novo(){
    this.producao = {};
    this.dialogProducao = true;
  }

  ocultarDialogProducao(){
    this.dialogProducao = false;
    this.submitted = false;
  }

  salvar(producao: Producao){

    this.producoes = [];

    if (this.producao.codigo == null) {

      this.producao.codigo = this.idService.generateId();

      this.producaoService.createProducao(producao).forEach(prod => {
        this.producoes.push(prod);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção criado', life: 3000});

    } else {

      this.producaoService.editProducao(producao).forEach(prod => {
        this.producoes.push(prod);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Produção alterada', life: 3000});

    }

    this.atualizaProducao(this.producao);
    this.producoes = [...this.producoes];
    this.dialogProducao = false;
  }

  atualizaProducao(producao: Producao) {

    this.talhao = this.producaoService.calculaProdTalhao(producao.talhao);
    this.talhoes = this.talhaoService.editTalhao(this.talhao);

    this.fazenda = this.talhaoService.calculaProdFazenda(this.talhao.fazenda);
    this.fazendas = this.fazendaService.editFazenda(this.fazenda);

  }

}
