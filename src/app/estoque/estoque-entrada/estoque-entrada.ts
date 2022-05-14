import { ItemPedido } from './../../operacoes/entrada/pedidoItem/item-pedido';
import { Produto } from './../../cadastros/produto/produto';

export class EstoqueEntrada {
  id: number;
  produto: Produto;
  preco: string;
  quantidade: number;
  justificativa: string;
  dataCadastro: string;
  itemPedido: ItemPedido;
}
