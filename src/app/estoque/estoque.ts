import { Produto } from './../cadastros/produto/produto';

export class Estoque {
  produto: Produto;
  quantidade: number;

  constructor() {
    this.produto = new Produto();
  }
}
