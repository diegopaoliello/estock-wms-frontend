import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UnidadeMedidaRoutingModule } from './unidade-medida-routing.module';
import { UnidadeMedidaFormComponent } from './unidade-medida-form/unidade-medida-form.component';
import { UnidadeMedidaListaComponent } from './unidade-medida-lista/unidade-medida-lista.component';

@NgModule({
  declarations: [UnidadeMedidaFormComponent, UnidadeMedidaListaComponent],
  imports: [CommonModule, UnidadeMedidaRoutingModule, FormsModule],
  exports: [UnidadeMedidaFormComponent, UnidadeMedidaListaComponent],
})
export class UnidadeMedidaModule {}
