import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Fazenda } from '../domain/fazenda';
import { FazendaService } from '../services/fazenda.service';
import { IdService } from '../shared/id.service';

@Component({
  selector: 'app-fazenda',
  templateUrl: './fazenda.component.html',
  styleUrls: ['./fazenda.component.css'],
  providers: [ MessageService ]
})
export class FazendaComponent implements OnInit {

  title = 'angular-software-gestao-agricola';

  dialogTalhoes: boolean;
  dialogFazenda: boolean;
  submitted: boolean;

  fazenda: Fazenda;
  fazendas: Fazenda[] = [];

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private fazendaService: FazendaService,
              private idService: IdService) { }

  ngOnInit() {

    this.fazendaService.getFazendas().forEach(farm => {
      this.fazendas.push(farm);
    });

  }

  edit(fazenda: Fazenda){

    this.fazenda = {...fazenda};
    this.dialogFazenda = true;
  }

  delete(fazenda: Fazenda){

    this.confirmationService.confirm({
      message: 'Deseja excluir o registro: ' + fazenda.nome + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
      {
        this.fazendas = [];

        this.fazendaService.deleteFazenda(fazenda).forEach(farm => {
          this.fazendas.push(farm);
        });

        this.fazendas = [...this.fazendas];

        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Fazenda Excluída', life: 3000});
      }
    })
  }

  novo(){
    this.fazenda = {};
    this.dialogFazenda = true;
  }

  ocultarDialogFazenda(){
    this.dialogFazenda = false;
    this.submitted = false;
  }

  salvar(fazenda: Fazenda){

    this.fazendas = [];

    if (this.fazenda.codigo == null) {

      this.fazenda.codigo = this.idService.generateId();
      this.fazenda.produtividade = 0;

      this.fazendaService.createFazenda(fazenda).forEach(farm => {
        this.fazendas.push(farm);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: ' Fazenda criada', life: 3000});

    } else {

      this.fazendaService.editFazenda(fazenda).forEach(farm => {
        this.fazendas.push(farm);
      });

      this.messageService.add({severity:'success', summary: 'Sucesso', detail: ' Fazenda alterada', life: 3000});

    }

    this.fazendas = [...this.fazendas];
    this.dialogFazenda = false;
  }

}
