import { EstoqueEntradaManual } from './../estoque-entrada-manual';
import { ProdutoService } from './../../../cadastros/produto/produto.service';
import { Produto } from './../../../cadastros/produto/produto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EstoqueEntrada } from '../estoque-entrada';
import { EstoqueEntradaService } from '../estoque-entrada.service';

@Component({
  selector: 'app-estoque-entrada-form',
  templateUrl: './estoque-entrada-form.component.html',
  styleUrls: ['./estoque-entrada-form.component.css'],
})
export class EstoqueEntradaFormComponent {
  entradaEstoque: EstoqueEntradaManual;
  success: boolean = false;
  errors: String[];
  id: number;
  produtos: Produto[] = [];

  constructor(
    private service: EstoqueEntradaService,
    private produtoService: ProdutoService,
    private router: Router
  ) {
    this.entradaEstoque = new EstoqueEntradaManual();
  }

  ngOnInit(): void {
    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));
  }

  voltarParaListagem() {
    this.router.navigate(['/entradas-estoque/lista']);
  }

  onSubmit() {
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
