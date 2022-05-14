import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { EstoqueSaidaFormComponent } from './estoque-saida-form/estoque-saida-form.component';
import { EstoqueSaidaListaComponent } from './estoque-saida-lista/estoque-saida-lista.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'saidas-estoque',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form/:id', component: EstoqueSaidaFormComponent },
      { path: 'lista', component: EstoqueSaidaListaComponent },
      { path: '', redirectTo: '/saidas-estoque/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstoqueSaidaRoutingModule { }
