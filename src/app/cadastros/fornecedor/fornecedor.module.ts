import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';

@NgModule({
  declarations: [FornecedorFormComponent, FornecedorListaComponent],
  imports: [CommonModule, FornecedorRoutingModule, FormsModule, NgxMaskModule.forChild()],
  exports: [FornecedorFormComponent, FornecedorListaComponent],
})
export class FornecedorModule {}
