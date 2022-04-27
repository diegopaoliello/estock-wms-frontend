import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VendaRoutingModule } from './venda-routing.module';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendaListaComponent } from './venda-lista/venda-lista.component';
import { ItemVendaModule } from '../vendaItem/item-venda.module';

@NgModule({
  declarations: [VendaFormComponent, VendaListaComponent],
  imports: [CommonModule, VendaRoutingModule, FormsModule, ItemVendaModule],
  exports: [VendaFormComponent, VendaListaComponent],
})
export class VendaModule { }
