import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPedidoFormComponent } from './item-pedido-form/item-pedido-form.component';
import { ItemPedidoListaComponent } from './item-pedido-lista/item-pedido-lista.component';
import { PedidoRoutingModule } from './../pedido/pedido-routing.module';

@NgModule({
  declarations: [ItemPedidoFormComponent, ItemPedidoListaComponent],
  imports: [CommonModule, PedidoRoutingModule, FormsModule],
  exports: [ItemPedidoFormComponent, ItemPedidoListaComponent],
})
export class ItemPedidoModule { }
