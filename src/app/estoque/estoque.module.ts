import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueListaComponent } from './estoque-lista/estoque-lista.component';

@NgModule({
  declarations: [EstoqueListaComponent],
  imports: [CommonModule, EstoqueRoutingModule, FormsModule],
  exports: [EstoqueListaComponent],
})
export class EstoqueModule { }
