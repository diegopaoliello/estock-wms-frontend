import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './cliente-routing.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';

@NgModule({
  declarations: [ClienteFormComponent, ClienteListaComponent],
  imports: [CommonModule, ClientesRoutingModule, FormsModule, NgxMaskModule.forChild()],
  exports: [ClienteFormComponent, ClienteListaComponent],
})
export class ClienteModule { }
