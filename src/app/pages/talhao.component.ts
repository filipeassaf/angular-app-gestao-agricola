import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Fazenda } from '../domain/fazenda';
import { Talhao } from '../domain/talhao';
import { FazendaService } from '../services/fazenda.service';
import { TalhaoService } from '../services/talhao.service';
import { IdService } from '../shared/id.service';

@Component({
  selector: 'app-talhao',
  templateUrl: './talhao.component.html',
  styleUrls: ['./talhao.component.css'],
  providers: [ MessageService ]
})
export class TalhaoComponent implements OnInit {

  title = 'angular-software-gestao-agricola';

  dialogTalhao: boolean;
  dialogProducao: boolean;
  submitted: boolean;

  talhao: Talhao;
  talhoes: Talhao[] = [];
  fazendas: Fazenda[] = [];

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private talhaoService: TalhaoService,
              private fazendaService: FazendaService,
              private idService: IdService) { }

  ngOnInit() {

    this.talhaoService.getTalhoes().forEach(tal => {
      this.talhoes.push(tal);
    });

    this.fazendaService.getFazendas().forEach(farm => {
      this.fazendas.push(farm);
    });

  }

  edit(talhao: Talhao){

    this.talhao = {...talhao};
    this.dialogTalhao = true;
  }

  delete(talhao: Talhao){

    this.confirmationService.confirm({
      message: 'Deseja excluir o registro: ' + talhao.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
      {
        this.talhoes = [];

        this.talhaoService.deleteTalhao(talhao).forEach(tal => {
          this.talhoes.push(tal);
        });

        this.talhoes = [...this.talhoes];

        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Talhão Excluído', life: 3000});
      }
    })
  }

  novo(){
    this.talhao = {};
    this.dialogTalhao = true;
  }

  ocultarDialogTalhao(){
    this.dialogTalhao = false;
    this.submitted = false;
  }

  salvar(talhao: Talhao){

    this.talhoes = [];

    if (this.talhao.codigo == null) {

      this.talhao.codigo = this.idService.generateId();
      this.talhao.produtividade = 0;

      this.talhaoService.createTalhao(talhao).forEach(tal => {
        this.talhoes.push(tal);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: ' Talhão criado', life: 3000});

    } else {

      this.talhaoService.editTalhao(talhao).forEach(tal => {
        this.talhoes.push(tal);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: ' Talhão alterado', life: 3000});

    }

    this.talhoes = [...this.talhoes];
    this.dialogTalhao = false;
  }

}
