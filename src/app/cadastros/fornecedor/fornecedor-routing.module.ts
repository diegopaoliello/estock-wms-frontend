import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'fornecedores',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: FornecedorFormComponent },
      { path: 'form/:id', component: FornecedorFormComponent },
      { path: 'lista', component: FornecedorListaComponent },
      { path: '', redirectTo: '/fornecedores/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FornecedorRoutingModule {}
