import { Observable } from 'rxjs';
import { ProdutoService } from '../../../cadastros/produto/produto.service';
import { Produto } from '../../../cadastros/produto/produto';
import { Component } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { EstoqueSaida } from '../estoque-saida';
import { EstoqueSaidaService } from '../estoque-saida.service';

@Component({
  selector: 'app-estoque-saida-form',
  templateUrl: './estoque-saida-form.component.html',
  styleUrls: ['./estoque-saida-form.component.css'],
})
export class EstoqueSaidaFormComponent {
  saidaEstoque: EstoqueSaida;
  success: boolean = false;
  errors: String[];
  id: number;
  produtos: Produto[] = [];
  produto: Produto;
  permiteEdicao: boolean = false;

  constructor(
    private service: EstoqueSaidaService,
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.saidaEstoque = new EstoqueSaida();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getSaidaEstoqueById(this.id).subscribe(
          (response) => {
            this.saidaEstoque = response;
            this.permiteEdicao = false;
            this.produto = this.saidaEstoque.itemVenda.produto;
          },
          (errorResponse) => (this.saidaEstoque = new EstoqueSaida())
        );
      } else {
        this.produto = new Produto();
        this.permiteEdicao = false;
      }
    });

    this.produtoService
      .getProdutos()
      .subscribe((response) => (this.produtos = response));
  }

  voltarParaListagem() {
    this.router.navigate(['/saidas-estoque/lista']);
  }
}
