import { TableConfig } from './../../util/tableConfig';
import { DataTableUtil } from '../../util/DataTableUtil';
import { ProdutoService } from './../../cadastros/produto/produto.service';
import { Produto } from './../../cadastros/produto/produto';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estoque } from '../estoque';
import { EstoqueService } from '../estoque.service';
declare var $: any;

@Component({
  selector: 'app-estoque-lista',
  templateUrl: './estoque-lista.component.html',
  styleUrls: ['./estoque-lista.component.css'],
})
export class EstoqueListaComponent implements OnInit {
  estoques: Estoque[] = [];
  estoqueSelecionado: Estoque;
  mensagemSucesso: string;
  mensagemErro: string;
  produtos: Produto[] = [];
  idProduto: number;
  quantidade: number;
  tableConfig: TableConfig = new TableConfig('Lista de produtos em estoque', [0, 1, 2, 3, 4, 5], null);

  constructor(private produtoService: ProdutoService, private service: EstoqueService, private router: Router) { }

  ngOnInit(): void {
    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));

    this.consultar();
  }

  consultar() {
    this.service
      .getEstoques(this.idProduto, this.quantidade)
      .subscribe((resposta) => {
        this.estoques = resposta;
        console.log(resposta);
        if (this.estoques == null) {
          console.log("aqui");
          this.estoques = [];
        }

        DataTableUtil.enableTable(this.tableConfig);
      });
  }
}
