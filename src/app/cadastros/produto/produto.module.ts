import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';

@NgModule({
  declarations: [ProdutoFormComponent, ProdutoListaComponent],
  imports: [CommonModule, ProdutoRoutingModule, FormsModule],
  exports: [ProdutoFormComponent, ProdutoListaComponent],
})
export class ProdutoaModule {}
