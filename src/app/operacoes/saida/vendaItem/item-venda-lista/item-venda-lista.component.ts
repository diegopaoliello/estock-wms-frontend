import { VendaService } from './../../venda/venda.service';
import { Venda } from './../../venda/venda';
import { DataTableUtil } from './../../../../util/DataTableUtil';
import { TableConfig } from './../../../../util/tableConfig';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ItemVenda } from '../item-venda';
import { ItemVendaService } from '../item-venda.service';
declare var $: any;

@Component({
  selector: 'app-item-venda-lista',
  templateUrl: './item-venda-lista.component.html',
  styleUrls: ['./item-venda-lista.component.css'],
})
export class ItemVendaListaComponent implements OnInit {
  itens: ItemVenda[] = [];
  itemSelecionado: ItemVenda;
  mensagemSucesso: string;
  mensagemErro: string;
  idVenda: number;
  venda: Venda;
  tableConfig: TableConfig = new TableConfig('Venda de Compras', [0, 1, 2], null);

  @Output() existeItem = new EventEmitter();

  constructor(private service: ItemVendaService, private vendaService: VendaService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe((urlParams) => {
      this.idVenda = urlParams['id'];
      this.existeItem.emit(false);

      this.vendaService.getVendaById(this.idVenda).subscribe((resposta) => (this.venda = resposta));

      this.service
        .getItensVenda(this.idVenda)
        .subscribe((resposta) => {
          this.itens = resposta;
          this.tableConfig.tableHeader = this.getTableHeader(this.venda);
          DataTableUtil.enableTable(this.tableConfig);
          this.existeItem.emit(this.itens.length > 0);
        });

    });
  }

  novoCadastro() {
    this.router.navigate(['/itens-venda/form']);
  }

  preparaDelecao(itemVenda: ItemVenda) {
    this.itemSelecionado = itemVenda;
  }

  deletarVenda() {
    this.service.deletar(this.itemSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Item do Venda deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o Item do Venda.')
    );
  }

  getTableHeader(venda: Venda): Object {
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
                text: 'Venda: ' + venda.id,
                fontSize: 9,
                bold: true,
              }
            ],
            [
              {
                text: 'Fornecedor: ' + venda.cliente.nomeFantasia,
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
