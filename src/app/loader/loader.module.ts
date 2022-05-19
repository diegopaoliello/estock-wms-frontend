import { NgxLoadingModule } from 'ngx-loading';
import { LoaderComponent } from './loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true })
  ]
})
export class LoaderModule { }
