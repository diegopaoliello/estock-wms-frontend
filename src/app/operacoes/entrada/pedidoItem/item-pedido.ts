import { Pedido } from './../pedido/pedido';
import { Produto } from './../../../cadastros/produto/produto';

export class ItemPedido {
  id: number;
  pedido: Pedido;
  produto: Produto;
  preco: string;
  desconto: string;
  dataCadastro: string;

  constructor() {
    this.produto = new Produto();
  }
}
