import { ProdutoService } from './../../cadastros/produto/produto.service';
import { Produto } from './../../cadastros/produto/produto';
import { Component, OnInit } from '@angular/core';
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
}
