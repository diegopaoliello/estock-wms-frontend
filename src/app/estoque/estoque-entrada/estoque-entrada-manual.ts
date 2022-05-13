import { ItemPedido } from '../../operacoes/entrada/pedidoItem/item-pedido';
import { Produto } from '../../cadastros/produto/produto';

export class EstoqueEntradaManual {
  id: number;
  produto: Produto;
  preco: string;
  quantidade: number;
  observacao: string;
  dataCadastro: string;

  constructor() {
    this.produto = new Produto();
  }
}
