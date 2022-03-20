import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UnidadeMedida } from '../unidade-medida';
import { UnidadeMedidaService } from '../unidade-medida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unidade-medida-form',
  templateUrl: './unidade-medida-form.component.html',
  styleUrls: ['./unidade-medida-form.component.css'],
})
export class UnidadeMedidaFormComponent implements OnInit {
  unidadeMedida: UnidadeMedida;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: UnidadeMedidaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.unidadeMedida = new UnidadeMedida();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getUnidadeMedidaById(this.id).subscribe(
          (response) => (this.unidadeMedida = response),
          (errorResponse) => (this.unidadeMedida = new UnidadeMedida())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/unidades-medida/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.unidadeMedida).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a unidade de medida.'];
        }
      );
    } else {
      this.service.salvar(this.unidadeMedida).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.unidadeMedida = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
