import { TableConfig } from '../../../../util/tableConfig';
import { DataTableUtil } from '../../../../util/DataTableUtil';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from '../pedido';
import { PedidoService } from '../pedido.service';
declare var $: any;

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.css'],
})
export class PedidoListaComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Lista de Pedidos de Compras', [0, 1, 2]);

  constructor(private service: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getPedidos()
      .subscribe((resposta) => {
        this.pedidos = resposta;

        DataTableUtil.enableTable(this.tableConfig);
      });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

  novoCadastro() {
    this.router.navigate(['/pedidos/form']);
  }

  selecionarPedido(pedido: Pedido) {
    this.pedidoSelecionado = pedido;
  }

  deletarPedido() {
    this.service.deletar(this.pedidoSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Pedido deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o pedido.')
    );
  }

  aprovarPedido() {
    this.service.aprovar(this.pedidoSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Pedido aprovado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao aprovar o pedido.')
    );
  }

  reprovarPedido() {
    this.service.reprovar(this.pedidoSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Pedido reprovado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao reprovar o pedido.')
    );
  }
}
