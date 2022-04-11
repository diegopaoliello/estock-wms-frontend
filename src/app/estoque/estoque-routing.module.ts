import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstoqueListaComponent } from './estoque-lista/estoque-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'estoques',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'lista', component: EstoqueListaComponent },
      { path: '', redirectTo: '/estoques/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstoqueRoutingModule { }
