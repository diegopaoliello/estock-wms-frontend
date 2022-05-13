import { PedidoService } from './../../pedido/pedido.service';
import { Pedido } from './../../pedido/pedido';
import { DataTableUtil } from './../../../../util/DataTableUtil';
import { TableConfig } from './../../../../util/tableConfig';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output, AfterContentInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
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
  pedido: Pedido;
  tableConfig: TableConfig = new TableConfig('Pedido de Compras', [0, 1, 2], null);

  @Output() existeItem = new EventEmitter();
  @Input('pedido') pedidos: Pedido = new Pedido();

  constructor(private service: ItemPedidoService, private pedidoService: PedidoService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe((urlParams) => {
      this.idPedido = urlParams['id'];
      this.existeItem.emit(false);

      if (this.idPedido) {
        this.pedidoService.getPedidoById(this.idPedido).subscribe((resposta) => (this.pedido = resposta));

        this.service
          .getItensPedido(this.idPedido)
          .subscribe((resposta) => {
            this.itens = resposta;

            this.tableConfig.tableHeader = this.getTableHeader(this.pedido);
            DataTableUtil.enableTable(this.tableConfig);
            this.existeItem.emit(this.itens.length > 0);
          });

      } else {
        this.tableConfig.tableHeader = this.getTableHeader(this.pedido);
        DataTableUtil.enableTable(this.tableConfig);
        this.existeItem.emit(this.itens.length > 0);
      }
    });
  }

  novoCadastro() {
    this.router.navigate(['/itens/form']);
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

  getTableHeader(pedido: Pedido): Object {
    let tableHeader: Object = [
      {
        margin: [0, 0, 0, 10],
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex % 2 === 0) ? '#ebebeb' : '#f5f5f5';
          }
        },
        table: {
          widths: ['100%'],
          heights: [20, 10],
          body: [
            [
              {
                text: 'Pedido: ' + pedido?.id ?? '',
                fontSize: 9,
                bold: true,
              }
            ],
            [
              {
                text: 'Fornecedor: ' + pedido?.fornecedor.nomeFantasia ?? '',
                fontSize: 9,
                bold: true
              }
            ],
          ],
        }
      }
    ];

    return tableHeader;
  }
}
