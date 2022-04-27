import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListaComponent } from './venda-lista/venda-lista.component';
import { ItemVendaFormComponent } from './../vendaItem/item-venda-form/item-venda-form.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'vendas',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: VendaFormComponent },
      { path: 'form/:id', component: VendaFormComponent },
      { path: 'lista', component: VendaListaComponent },
      { path: ':idVenda/itens-venda/form', component: ItemVendaFormComponent },
      { path: ':idVenda/itens-venda/form/:id', component: ItemVendaFormComponent },
      { path: '', redirectTo: '/vendas/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaRoutingModule { }
