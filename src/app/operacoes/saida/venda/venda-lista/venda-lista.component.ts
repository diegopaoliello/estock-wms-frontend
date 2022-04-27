import { TableConfig } from '../../../../util/tableConfig';
import { DataTableUtil } from '../../../../util/DataTableUtil';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from '../venda';
import { VendaService } from '../venda.service';
declare var $: any;

@Component({
  selector: 'app-venda-lista',
  templateUrl: './venda-lista.component.html',
  styleUrls: ['./venda-lista.component.css'],
})
export class VendaListaComponent implements OnInit {
  vendas: Venda[] = [];
  vendaSelecionado: Venda;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Lista de Vendas de Compras', [0, 1, 2], null);

  constructor(private service: VendaService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getVendas()
      .subscribe((resposta) => {
        this.vendas = resposta;

        DataTableUtil.enableTable(this.tableConfig);
      });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
  }

  novoCadastro() {
    this.router.navigate(['/vendas/form']);
  }

  selecionarVenda(venda: Venda) {
    this.vendaSelecionado = venda;
  }

  deletarVenda() {
    this.service.deletar(this.vendaSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Venda deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o venda.')
    );
  }

  aprovarVenda() {
    this.service.aprovar(this.vendaSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Venda aprovado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao aprovar o venda.')
    );
  }

  reprovarVenda() {
    this.service.reprovar(this.vendaSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Venda reprovado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao reprovar o venda.')
    );
  }
}
