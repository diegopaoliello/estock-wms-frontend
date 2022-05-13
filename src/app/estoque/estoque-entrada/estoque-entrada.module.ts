import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstoqueEntradaRoutingModule } from './estoque-entrada-routing.module';
import { EstoqueEntradaFormComponent } from './estoque-entrada-form/estoque-entrada-form.component';
import { EstoqueEntradaListaComponent } from './estoque-entrada-lista/estoque-entrada-lista.component';

@NgModule({
  declarations: [EstoqueEntradaFormComponent, EstoqueEntradaListaComponent],
  imports: [CommonModule, EstoqueEntradaRoutingModule, FormsModule],
  exports: [EstoqueEntradaFormComponent, EstoqueEntradaListaComponent],
})
export class EstoqueEntradaModule {}
