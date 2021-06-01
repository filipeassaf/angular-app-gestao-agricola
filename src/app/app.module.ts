import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { FazendaComponent } from './pages/fazenda.component';
import { TalhaoComponent } from './pages/talhao.component';
import {TabMenuModule} from 'primeng/tabmenu';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HomeComponent } from './pages/home.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProducaoComponent } from './pages/producao.component';
import { FazendaService } from './services/fazenda.service';
import { TalhaoService } from './services/talhao.service';

@NgModule({
  declarations: [
    AppComponent,
    FazendaComponent,
    TalhaoComponent,
    HomeComponent,
    ProducaoComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AppRoutingModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [ConfirmationService, MessageService, FazendaService, TalhaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
