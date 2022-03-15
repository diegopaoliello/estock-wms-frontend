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
export class PedidoListaComponent implements OnInit, AfterViewInit {
  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(private service: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.pedidos = [];

    this.service
      .getPedidos()
      .subscribe((resposta) => (this.pedidos = resposta));
  }

  ngAfterViewInit(): void {
    $(function () {
      setTimeout(() => {
        $('#dataTable').DataTable();
      }, 1000);
    });
  }

  novoCadastro() {
    this.router.navigate(['/pedidos/form']);
  }

  preparaDelecao(pedido: Pedido) {
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
}
