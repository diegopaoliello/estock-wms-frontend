import { VendaStatusService } from '../../../../cadastros/venda-status/venda-status.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Venda } from '../venda';
import { VendaService } from '../venda.service';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cadastros/clientes/cliente';
import { ClienteService } from 'src/app/cadastros/clientes/cliente.service';
import { VendaStatus } from 'src/app/cadastros/venda-status/venda-status';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent implements OnInit, AfterContentInit {
  venda: Venda;
  success: boolean = false;
  errors: String[];
  id: number;
  status: VendaStatus[] = [];
  clientes: Cliente[] = [];
  exibirModal: boolean = false;
  clienteSelecionado: Cliente;

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
    private clienteService: ClienteService,
    private statusService: VendaStatusService,
    private service: VendaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.venda = new Venda();
  }

  ngAfterContentInit(): void {
    this.ativarBotoes();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getVendaById(this.id).subscribe(
          (response) => {
            this.venda = response;
            this.clienteSelecionado = this.venda.cliente;
          },
          (errorResponse) => (this.venda = new Venda())
        );
      } else {
        this.clienteSelecionado = new Cliente();
      }
    });

    this.statusService
      .getVendaStatus()
      .subscribe((response) => (this.status = response));

    this.clienteService
      .getClientes()
      .subscribe((response) => (this.clientes = response));

  }

  ativarBotoes(): void {
    if (this.venda) {
      this.btnAprovar = (this.venda.status && this.venda.status.codigo == 'ABERTO') && this.existeItem;
      this.btnReprovar = this.btnAprovar;
      this.btnConcluir = this.venda.status && this.venda.status.codigo == 'APROVADO';
      this.btnSalvar = !this.venda.id;
      this.btnAtualizar = this.venda.id && (this.venda.status && (this.venda.status.codigo == 'ABERTO' || this.venda.status.codigo == 'APROVADO'));
      this.btnAddItem = this.venda.status && this.venda.status.codigo == 'ABERTO';
      this.habilitarTrocaStatus = (this.btnAprovar || this.btnAtualizar || this.btnReprovar || this.btnConcluir);
      this.permiteEdicao = (this.btnSalvar || this.venda.status.codigo == 'ABERTO');
    }
  }

  alterarStatus(status: string): void {
    this.venda.status = this.status.find(s => s.codigo === status);
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
    this.router.navigate(['vendas/' + this.venda.id + '/itens/form']);
  }

  onSubmit() {
    if (this.clienteSelecionado.id) {
      this.venda.cliente = this.clienteSelecionado;
    } else {
      this.venda.cliente = null;
    }

    if (this.venda.id) {
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
