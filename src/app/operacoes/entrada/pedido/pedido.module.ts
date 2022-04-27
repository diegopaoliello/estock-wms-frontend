import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { ItemPedidoModule } from '../pedidoItem/item-pedido.module';

@NgModule({
  declarations: [PedidoFormComponent, PedidoListaComponent],
  imports: [CommonModule, PedidoRoutingModule, FormsModule, ItemPedidoModule],
  exports: [PedidoFormComponent, PedidoListaComponent],
})
export class PedidoModule {}
