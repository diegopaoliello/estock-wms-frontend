import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { Observable } from 'rxjs';
import { CategoriaService } from '../../categoria/categoria.service';
import { UnidadeMedidaService } from '../../unidade-medida/unidade-medida.service';
import { Categoria } from '../../categoria/categoria';
import { UnidadeMedida } from '../../unidade-medida/unidade-medida';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto;
  success: boolean = false;
  errors: String[];
  id: number;
  categorias: Categoria[] = [];
  categoriaSelecionado: Categoria;
  unidadesMedida: UnidadeMedida[] = [];
  unidadesMedidaSelecionado: UnidadeMedida;

  constructor(
    private categoriaService: CategoriaService,
    private unidadesMedidaService: UnidadeMedidaService,
    private service: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.produto = new Produto();
    this.categoriaSelecionado = new Categoria();
    this.unidadesMedidaSelecionado = new UnidadeMedida();
  }

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((response) => (this.categorias = response));

    this.unidadesMedidaService
      .getUnidadesMedida()
      .subscribe((response) => (this.unidadesMedida = response));

    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getProdutoById(this.id).subscribe(
          (response) => {
            this.produto = response;
            this.categoriaSelecionado = this.produto.categoria;
            this.unidadesMedidaSelecionado = this.produto.unidadeMedida;
          },
          (errorResponse) => (this.produto = new Produto())
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/produtos/lista']);
  }

  onSubmit() {
    if (this.unidadesMedidaSelecionado.id) {
      this.produto.unidadeMedida = this.unidadesMedidaSelecionado;
    } else {
      this.produto.unidadeMedida = null;
    }

    if (this.categoriaSelecionado.id) {
      this.produto.categoria = this.categoriaSelecionado;
    } else {
      this.produto.categoria = null;
    }

    if (this.id) {
      this.service.atualizar(this.produto).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        }
      );
    } else {
      this.service.salvar(this.produto).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.produto = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
