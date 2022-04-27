import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemVendaFormComponent } from './item-venda-form/item-venda-form.component';
import { ItemVendaListaComponent } from './item-venda-lista/item-venda-lista.component';
import { VendaRoutingModule } from './../venda/venda-routing.module';

@NgModule({
  declarations: [ItemVendaFormComponent, ItemVendaListaComponent],
  imports: [CommonModule, VendaRoutingModule, FormsModule],
  exports: [ItemVendaFormComponent, ItemVendaListaComponent],
})
export class ItemVendaModule { }
