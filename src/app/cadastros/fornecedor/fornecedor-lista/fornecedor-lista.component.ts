import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from '../fornecedor';
import { FornecedorService } from '../fornecedor.service';
declare var $: any;

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.css'],
})
export class FornecedorListaComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  fornecedorSelecionado: Fornecedor;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(private service: FornecedorService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getFornecedores()
      .subscribe((resposta) => {
        this.fornecedores = resposta;
        $(function () {
          $('#dataTable').DataTable({
            'retrieve': true,
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-BR.json'
            },
            'responsive': true
          });

          let linhaAtual;

          $('#dataTable').on('click', '.delete', function () {
            linhaAtual = this;
          });

          $('#modalDelecao').on('click', '.confirmar', function () {
            var table = $('#dataTable').DataTable();
            table
              .row($(linhaAtual).parents('tr'))
              .remove()
              .draw();
          });
        });
      });
  }

  novoCadastro() {
    this.router.navigate(['/fornecedores/form']);
  }

  preparaDelecao(fornecedor: Fornecedor) {
    this.fornecedorSelecionado = fornecedor;
  }

  deletarFornecedor() {
    this.service.deletar(this.fornecedorSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Fornecedor deletada com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar a fornecedor.')
    );
  }
}
