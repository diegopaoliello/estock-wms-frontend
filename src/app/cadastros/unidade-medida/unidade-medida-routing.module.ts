import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadeMedidaFormComponent } from './unidade-medida-form/unidade-medida-form.component';
import { UnidadeMedidaListaComponent } from './unidade-medida-lista/unidade-medida-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'unidade-medida',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: UnidadeMedidaFormComponent },
      { path: 'form/:id', component: UnidadeMedidaFormComponent },
      { path: 'lista', component: UnidadeMedidaListaComponent },
      { path: '', redirectTo: '/unidade-medida/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadeMedidaRoutingModule {}
