import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemVenda } from '../item-venda';
import { ItemVendaService } from '../item-venda.service';
import { Produto } from './../../../../cadastros/produto/produto';
import { ProdutoService } from './../../../../cadastros/produto/produto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-venda-form',
  templateUrl: './item-venda-form.component.html',
  styleUrls: ['./item-venda-form.component.css'],
})
export class ItemVendaFormComponent implements OnInit {
  itemVenda: ItemVenda;
  success: boolean = false;
  errors: String[];
  id: number;
  idVenda: number;
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private service: ItemVendaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.itemVenda = new ItemVenda();
  }

  ngOnInit(): void {
    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));

    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      this.idVenda = urlParams['idVenda'];

      if (this.id) {
        this.service.getItemVendaById(this.idVenda, this.id).subscribe(
          (response) => (this.itemVenda = response),
          (errorResponse) => (this.itemVenda = new ItemVenda())
        );
      }
    });
  }

  onChange(produto: Produto) {
    console.log(produto);
    this.itemVenda.preco = produto.precoMedio;


    this.produtoService
    .calcularPrecoMedio(produto.id)
    .subscribe((resposta) => {
      this.itemVenda.preco = resposta.toString();
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/vendas/form/' + this.idVenda]);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.itemVenda).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar o Item da Venda.'];
        }
      );
    } else {
      this.service.salvar(this.idVenda, this.itemVenda).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.itemVenda = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
