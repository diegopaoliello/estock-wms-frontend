import { PerfilGuard } from './../../perfil.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'categorias',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form', component: CategoriaFormComponent, canActivate: [PerfilGuard], data: {
          autorizacao: 'CADASTRO', acoes: 'INSERIR'
        }
      },
      {
        path: 'form/:id', component: CategoriaFormComponent, canActivate: [PerfilGuard], data: {
          autorizacao: 'CADASTRO', acoes: ['EDITAR', "VISUALIZAR"]
        }
      },
      {
        path: 'lista', component: CategoriaListaComponent, canActivate: [PerfilGuard], data: {
          autorizacao: 'CADASTRO', acoes: ['EDITAR', "VISUALIZAR"]
        }
      },
      { path: '', redirectTo: '/categorias/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule { }
