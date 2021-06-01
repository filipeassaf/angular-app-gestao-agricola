import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FazendaComponent } from './pages/fazenda.component';
import { TalhaoComponent } from './pages/talhao.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { ProducaoComponent } from './pages/producao.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
      path: '', component: HomeComponent,
        children: [
          {path: '', component: FazendaComponent},
          {path: 'fazendas', component: FazendaComponent},
          {path: 'talhoes', component: TalhaoComponent},
          {path: 'producoes', component: ProducaoComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
