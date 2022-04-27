import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
declare var $: any;

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css'],
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];
  produtoSelecionado: Produto;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Lista de Produtos', [0, 1, 2, 3, 4], null);

  constructor(private service: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getProdutos()
      .subscribe((resposta) => {
        this.produtos = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/produtos/form']);
  }

  preparaDelecao(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  deletarProduto() {
    this.service.deletar(this.produtoSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Produto deletada com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar a produto.')
    );
  }
}
