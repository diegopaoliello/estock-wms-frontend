import { PedidoStatusService } from '../../../../cadastros/pedido-status/pedido-status.service';
import { PedidoStatus } from '../../../../cadastros/pedido-status/pedido-status';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
export class PedidoFormComponent implements OnInit, AfterContentInit {
  pedido: Pedido = new Pedido();
  success: boolean = false;
  errors: String[];
  id: number;
  fornecedores: Fornecedor[] = [];
  status: PedidoStatus[] = [];
  exibirModal: boolean = false;
  fornecedorSelecionado;

  existeItem: boolean = false;
  btnAprovar: boolean = false;
  btnReprovar: boolean = false;
  btnConcluir: boolean = false;
  btnSalvar: boolean = false;
  btnAtualizar: boolean = false;
  btnAddItem: boolean = false;
  habilitarTrocaStatus: boolean = false;
  permiteEdicao: boolean = false;

  constructor(
    private fornecedorService: FornecedorService,
    private statusService: PedidoStatusService,
    private service: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.pedido = new Pedido();
  }

  ngAfterContentInit(): void {
    this.ativarBotoes();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getPedidoById(this.id).subscribe(
          (response) => {
            this.pedido = response;
            this.fornecedorSelecionado = this.pedido.fornecedor;
          },
          (errorResponse) => (this.pedido = new Pedido())
        );
      } else {
        this.fornecedorSelecionado = new Fornecedor();
      }
    });

    this.
      statusService.getPedidoStatus()
      .subscribe((response) => (this.status = response));

    this.fornecedorService
      .getFornecedores()
      .subscribe((response) => (this.fornecedores = response));
  }

  ativarBotoes(): void {
    if (this.pedido) {
      this.btnAprovar = (this.status && this.pedido.status.codigo == 'ABERTO') && this.existeItem;
      this.btnReprovar = this.btnAprovar;
      this.btnConcluir = this.pedido.status && this.pedido.status.codigo == 'APROVADO';
      this.btnSalvar = !this.pedido.id;
      this.btnAtualizar = this.pedido.id && (this.pedido.status && (this.pedido.status.codigo == 'ABERTO' || this.pedido.status.codigo == 'APROVADO'));
      this.btnAddItem = this.pedido.status && this.pedido.status.codigo == 'ABERTO';
      this.habilitarTrocaStatus = (this.btnAprovar || this.btnAtualizar || this.btnReprovar || this.btnConcluir);
      this.permiteEdicao = (this.btnSalvar || this.pedido.status.codigo == 'ABERTO');
    }
  }

  alterarStatus(status: string): void {
    this.pedido.status = this.status.find(s => s.codigo === status);
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
    this.router.navigate(['pedidos/' + this.pedido.id + '/itens/form']);
  }

  onSubmit() {
    if (this.fornecedorSelecionado.id) {
      this.pedido.fornecedor = this.fornecedorSelecionado;
    } else {
      this.pedido.fornecedor = null;
    }

    if (this.pedido.id) {
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
          this.ativarBotoes();
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
