import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
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
  tableConfig: TableConfig = new TableConfig('Lista de fornecedores', [0, 1, 2], null);

  constructor(private service: FornecedorService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getFornecedores()
      .subscribe((resposta) => {
        this.fornecedores = resposta;
        DataTableUtil.enableTable(this.tableConfig);
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
