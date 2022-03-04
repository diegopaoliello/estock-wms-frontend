import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
})
export class FornecedorFormComponent implements OnInit {
  fornecedor: Fornecedor;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.fornecedor = new Fornecedor();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getFornecedorById(this.id).subscribe(
          (response) => (this.fornecedor = response),
          (errorResponse) => (this.fornecedor = new Fornecedor())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/fornecedores/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.fornecedor).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a fornecedor.'];
        }
      );
    } else {
      this.service.salvar(this.fornecedor).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.fornecedor = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
