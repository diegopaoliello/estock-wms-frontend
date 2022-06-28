import { Pedido } from './../pedido/pedido';
import { Produto } from './../../../cadastros/produto/produto';

export class ItemPedido {
  id: number;
  pedido: Pedido;
  produto: Produto = new Produto();
  quantidade: number;
  preco: number;
  desconto: number;
  dataCadastro: string;

}
