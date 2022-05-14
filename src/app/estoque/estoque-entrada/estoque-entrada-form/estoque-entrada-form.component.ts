import { Observable } from 'rxjs';
import { ProdutoService } from './../../../cadastros/produto/produto.service';
import { Produto } from './../../../cadastros/produto/produto';
import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { EstoqueEntrada } from '../estoque-entrada';
import { EstoqueEntradaService } from '../estoque-entrada.service';

@Component({
  selector: 'app-estoque-entrada-form',
  templateUrl: './estoque-entrada-form.component.html',
  styleUrls: ['./estoque-entrada-form.component.css'],
})
export class EstoqueEntradaFormComponent {
  entradaEstoque: EstoqueEntrada;
  success: boolean = false;
  errors: String[];
  id: number;
  produtos: Produto[] = [];
  produto: Produto;
  permiteEdicao: boolean = false;

  constructor(
    private service: EstoqueEntradaService,
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.entradaEstoque = new EstoqueEntrada();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getEntradaEstoqueById(this.id).subscribe(
          (response) => {
            this.entradaEstoque = response;
            this.permiteEdicao = false;
            this.produto = this.entradaEstoque.produto;
          },
          (errorResponse) => (this.entradaEstoque = new EstoqueEntrada())
        );
      } else {
        this.produto = new Produto();
        this.permiteEdicao = true;
      }
    });

    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));
  }

  voltarParaListagem() {
    this.router.navigate(['/entradas-estoque/lista']);
  }

  onSubmit() {
    if (this.produto.id) {
      this.entradaEstoque.produto = this.produto;
    }

    this.service.salvar(this.entradaEstoque).subscribe(
      (response) => {
        this.success = true;
        this.errors = null;
        this.entradaEstoque = response;
      },
      (errorResponse) => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      }
    );
  }

  onChange(produto: Produto) {
    this.entradaEstoque.preco = this.produtos.find(p => p.id === produto.id).precoMedio;
  }
}
