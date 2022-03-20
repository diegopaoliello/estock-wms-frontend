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

  constructor(private service: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getProdutos()
      .subscribe((resposta) => {
        this.produtos = resposta;
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
