import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoqueEntradaFormComponent } from './estoque-entrada-form/estoque-entrada-form.component';
import { EstoqueEntradaListaComponent } from './estoque-entrada-lista/estoque-entrada-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';
import { PerfilGuard } from 'src/app/perfil.guard';

const routes: Routes = [
  {
    path: 'entradas-estoque',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form', component: EstoqueEntradaFormComponent, canActivate: [PerfilGuard], data: {
          autorizacao: 'ESTOQUE_ENTRADA', acoes: ['INSERIR']
        }
      },
      {
        path: 'form/:id', component: EstoqueEntradaFormComponent, canActivate: [PerfilGuard], data: {
          autorizacao: 'ESTOQUE_ENTRADA', acoes: ['EDITAR', 'VISUALIZAR']
        }
      },
      { path: 'lista', component: EstoqueEntradaListaComponent },
      { path: '', redirectTo: '/entradas-estoque/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstoqueEntradaRoutingModule { }
