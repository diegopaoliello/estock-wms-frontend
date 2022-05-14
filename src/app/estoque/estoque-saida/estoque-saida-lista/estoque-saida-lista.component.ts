import { DataTableUtil } from '../../../util/DataTableUtil';
import { TableConfig } from '../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueSaida } from '../estoque-saida';
import { EstoqueSaidaService } from '../estoque-saida.service';
declare var $: any;

@Component({
  selector: 'app-estoque-saida-lista',
  templateUrl: './estoque-saida-lista.component.html',
  styleUrls: ['./estoque-saida-lista.component.css'],
})
export class EstoqueSaidaListaComponent implements OnInit {
  entradasEstoque: EstoqueSaida[] = [];
  entradaEstoqueSelecionado: EstoqueSaida;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Saídas de Estoque', [0, 1, 2, 3, 4], null);

  constructor(private service: EstoqueSaidaService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getSaidasEstoque()
      .subscribe((resposta) => {
        this.entradasEstoque = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/saidas-estoque/form']);
  }
}
