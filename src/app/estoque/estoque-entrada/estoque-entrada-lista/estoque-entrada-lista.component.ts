import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueEntrada } from '../estoque-entrada';
import { EstoqueEntradaService } from '../estoque-entrada.service';
declare var $: any;

@Component({
  selector: 'app-estoque-entrada-lista',
  templateUrl: './estoque-entrada-lista.component.html',
  styleUrls: ['./estoque-entrada-lista.component.css'],
})
export class EstoqueEntradaListaComponent implements OnInit {
  entradasEstoque: EstoqueEntrada[] = [];
  entradaEstoqueSelecionado: EstoqueEntrada;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Entradas de Estoque', [0, 1, 2, 3, 4], null);

  constructor(private service: EstoqueEntradaService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getEntradasEstoque()
      .subscribe((resposta) => {
        this.entradasEstoque = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/entradas-estoque/form']);
  }
}
