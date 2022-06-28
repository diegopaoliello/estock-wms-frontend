import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ItemPedido } from '../item-pedido';
import { ItemPedidoService } from '../item-pedido.service';
import { Produto } from './../../../../cadastros/produto/produto';
import { ProdutoService } from './../../../../cadastros/produto/produto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-pedido-form',
  templateUrl: './item-pedido-form.component.html',
  styleUrls: ['./item-pedido-form.component.css'],
})
export class ItemPedidoFormComponent implements OnInit {
  itemPedido: ItemPedido;
  success: boolean = false;
  errors: String[];
  id: number;
  idPedido: number;
  produtos: Produto[] = [];
  produtoSelecionado: Produto;

  constructor(
    private produtoService: ProdutoService,
    private service: ItemPedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.itemPedido = new ItemPedido();
  }

  ngOnInit(): void {
    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));

    let params: Observable<Params> = this.activatedRoute.params;

    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      this.idPedido = urlParams['idPedido'];

      if (this.id) {
        this.service.getItemPedidoById(this.idPedido, this.id).subscribe(
          (response) => {
            this.itemPedido = response;
            this.produtoSelecionado = this.itemPedido.produto;
          },
          (errorResponse) => (this.itemPedido = new ItemPedido())
        );
      } else {
        this.produtoSelecionado = new Produto();
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/pedidos/form/' + this.idPedido]);
  }

  onSubmit() {
    if (this.produtoSelecionado.id) {
      this.itemPedido.produto = this.produtoSelecionado;
    } else {
      this.itemPedido.produto = null;
    }

    if (this.id) {
      this.service.atualizar(this.itemPedido).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = errorResponse.error.errors;
        }
      );
    } else {
      this.service.salvar(this.idPedido, this.itemPedido).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.itemPedido = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
