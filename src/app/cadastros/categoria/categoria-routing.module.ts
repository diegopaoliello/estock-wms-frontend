import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { AuthGuard } from 'src/app/auth.guard';

const routes: Routes = [
  {
    path: 'categoria',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: CategoriaFormComponent },
      { path: 'form/:id', component: CategoriaFormComponent },
      { path: 'lista', component: CategoriaListaComponent },
      { path: '', redirectTo: '/categoria/lista', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaRoutingModule {}
