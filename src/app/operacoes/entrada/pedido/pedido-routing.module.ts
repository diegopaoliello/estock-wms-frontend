import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'pedidos',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: PedidoFormComponent },
      { path: 'form/:id', component: PedidoFormComponent },
      { path: 'lista', component: PedidoListaComponent },
      { path: '', redirectTo: '/pedidos/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
