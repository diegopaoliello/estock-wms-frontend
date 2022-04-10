import { ItemPedido } from './../../pedidoItem/item-pedido';
import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';
import { Observable } from 'rxjs';
import { Fornecedor } from 'src/app/cadastros/fornecedor/fornecedor';
import { FornecedorService } from 'src/app/cadastros/fornecedor/fornecedor.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css'],
})
export class PedidoFormComponent implements OnInit {
  pedido: Pedido;
  success: boolean = false;
  errors: String[];
  id: number;
  fornecedores: Fornecedor[] = [];
  exibirModal: boolean = false;

  existeItem: boolean = false;
  btnAprovar: boolean = false;
  btnReprovar: boolean = false;
  btnConcluir: boolean = false;

  constructor(
    private fornecedorService: FornecedorService,
    private service: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.pedido = new Pedido();
    this.pedido.fornecedor = new Fornecedor();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getPedidoById(this.id).subscribe(
          (response) => (this.pedido = response),
          (errorResponse) => (this.pedido = new Pedido())
        );
      }
    });

    this.fornecedorService
      .getFornecedores()
      .subscribe((response) => (this.fornecedores = response));

  }

  ativarBotoes(): void {
    if (this.pedido) {
      this.btnAprovar = this.pedido.status == 'ABERTO' && this.existeItem;
      this.btnReprovar = this.btnAprovar;
      this.btnConcluir = this.pedido.status == 'APROVADO';
    }
  }

  alterarStatus(status: string): void {
    this.pedido.status = status;
  }

  exibirModalStatus(): void {
    this.exibirModal = true;
  }

  existeItemOut(evento: boolean): void {
    this.existeItem = evento;
    this.ativarBotoes();
  }

  voltarParaListagem() {
    this.router.navigate(['/pedidos/lista']);
  }

  novoItem() {
    this.router.navigate(['pedidos/' + this.pedido.id + '/itens-pedido/form']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.pedido).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.ativarBotoes();
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar a pedido.'];
        }
      );
    } else {
      this.service.salvar(this.pedido).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.pedido = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
