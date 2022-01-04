import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css'],
})
export class CategoriaFormComponent implements OnInit {
  categoria: Categoria;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.categoria = new Categoria();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getCategoriaById(this.id).subscribe(
          (response) => (this.categoria = response),
          (errorResponse) => (this.categoria = new Categoria())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/categoria/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.categoria).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a categoria.'];
        }
      );
    } else {
      this.service.salvar(this.categoria).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.categoria = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
