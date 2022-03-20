import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPedido } from '../item-pedido';
import { ItemPedidoService } from '../item-pedido.service';
declare var $: any;

@Component({
  selector: 'app-item-pedido-lista',
  templateUrl: './item-pedido-lista.component.html',
  styleUrls: ['./item-pedido-lista.component.css'],
})
export class ItemPedidoListaComponent implements OnInit {
  itens: ItemPedido[] = [];
  itemSelecionado: ItemPedido;
  mensagemSucesso: string;
  mensagemErro: string;
  idPedido: number;

  constructor(private service: ItemPedidoService, private router: Router) { }

  ngOnInit(): void {
    this.itens = [];

    this.service
      .getItensPedido(this.idPedido)
      .subscribe((resposta) => {
        this.itens = resposta;
        $(function () {
          $('#dataTable').DataTable({
            'retrieve': true,
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-BR.json'
            },
            'responsive': true
          });

          $('#dataTable').on('click', '.delete', function () {
            var table = $('#dataTable').DataTable();
            table
              .row($(this).parents('tr'))
              .remove()
              .draw();
          });
        });
      });
  }

  novoCadastro() {
    this.router.navigate(['/itens-pedido/form']);
  }

  preparaDelecao(itemPedido: ItemPedido) {
    this.itemSelecionado = itemPedido;
  }

  deletarPedido() {
    this.service.deletar(this.itemSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Item do Pedido deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o Item do Pedido.')
    );
  }
}
