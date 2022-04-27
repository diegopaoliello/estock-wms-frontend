import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getClienteById(this.id).subscribe(
          (response) => (this.cliente = response),
          (errorResponse) => (this.cliente = new Cliente())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientees/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.cliente).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a cliente.'];
        }
      );
    } else {
      this.service.salvar(this.cliente).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
