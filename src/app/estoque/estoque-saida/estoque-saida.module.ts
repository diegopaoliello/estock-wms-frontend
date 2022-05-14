import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstoqueSaidaRoutingModule } from './estoque-saida-routing.module';
import { EstoqueSaidaFormComponent } from './estoque-saida-form/estoque-saida-form.component';
import { EstoqueSaidaListaComponent } from './estoque-saida-lista/estoque-saida-lista.component';

@NgModule({
  declarations: [EstoqueSaidaFormComponent, EstoqueSaidaListaComponent],
  imports: [CommonModule, EstoqueSaidaRoutingModule, FormsModule],
  exports: [EstoqueSaidaFormComponent, EstoqueSaidaListaComponent],
})
export class EstoqueSaidaModule { }
