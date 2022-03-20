import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemPedidoFormComponent } from './item-pedido-form/item-pedido-form.component';
import { ItemPedidoListaComponent } from './item-pedido-lista/item-pedido-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'itens-pedido',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: ItemPedidoFormComponent },
      { path: 'form/:id', component: ItemPedidoFormComponent },
      { path: 'lista', component: ItemPedidoListaComponent },
      { path: '', redirectTo: '/itens-pedido/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPedidoRoutingModule { }
