import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
declare var $: any;

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css'],
})
export class CategoriaListaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSelecionado: Categoria;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Listagem de categorias', [0, 1, 2], null);

  constructor(private service: CategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getCategorias()
      .subscribe((resposta) => {
        this.categorias = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/categorias/form']);
  }

  preparaDelecao(categoria: Categoria) {
    this.categoriaSelecionado = categoria;
  }

  deletarCategoria() {
    this.service.deletar(this.categoriaSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Categoria deletada com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar a categoria.')
    );
  }
}
