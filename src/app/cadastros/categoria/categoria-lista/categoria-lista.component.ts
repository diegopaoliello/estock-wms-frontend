import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

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

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .getCategorias()
      .subscribe((resposta) => (this.categorias = resposta));
  }

  novoCadastro() {
    this.router.navigate(['/categoria/form']);
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
