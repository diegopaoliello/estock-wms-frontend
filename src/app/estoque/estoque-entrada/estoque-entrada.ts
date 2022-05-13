import { ItemPedido } from './../../operacoes/entrada/pedidoItem/item-pedido';
import { Produto } from './../../cadastros/produto/produto';

export class EstoqueEntrada {
  id: number;
  produto: Produto;
  preco: number = 0;
  quantidade: number;
  observacao: string;
  dataCadastro: string;
  itemPedido: ItemPedido;

  constructor() {
    this.produto = new Produto();
    this.itemPedido = new ItemPedido();
  }
}
