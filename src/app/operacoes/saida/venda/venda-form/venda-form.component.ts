import { ItemVenda } from './../../vendaItem/item-venda';
import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { Venda } from '../venda';
import { VendaService } from '../venda.service';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cadastros/clientes/cliente';
import { ClienteService } from 'src/app/cadastros/clientes/cliente.service';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent implements OnInit {
  venda: Venda;
  success: boolean = false;
  errors: String[];
  id: number;
  clientes: Cliente[] = [];
  exibirModal: boolean = false;

  existeItem: boolean = false;
  btnAprovar: boolean = false;
  btnReprovar: boolean = false;
  btnConcluir: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private service: VendaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.venda = new Venda();
    this.venda.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getVendaById(this.id).subscribe(
          (response) => (this.venda = response),
          (errorResponse) => (this.venda = new Venda())
        );
      }
    });

    this.clienteService
      .getClientes()
      .subscribe((response) => (this.clientes = response));

  }

  ativarBotoes(): void {
    if (this.venda) {
      this.btnAprovar = this.venda.status == 'ABERTO' && this.existeItem;
      this.btnReprovar = this.btnAprovar;
      this.btnConcluir = this.venda.status == 'APROVADO';
    }
  }

  alterarStatus(status: string): void {
    this.venda.status = status;
  }

  exibirModalStatus(): void {
    this.exibirModal = true;
  }

  existeItemOut(evento: boolean): void {
    this.existeItem = evento;
    this.ativarBotoes();
  }

  voltarParaListagem() {
    this.router.navigate(['/vendas/lista']);
  }

  novoItem() {
    this.router.navigate(['vendas/' + this.venda.id + '/itens-venda/form']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.venda).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.ativarBotoes();
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a venda.'];
        }
      );
    } else {
      this.service.salvar(this.venda).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.venda = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
