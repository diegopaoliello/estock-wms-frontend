import { Venda } from './../venda/venda';
import { Produto } from '../../../cadastros/produto/produto';

export class ItemVenda {
  id: number;
  venda: Venda;
  produto: Produto;
  quantidade: number;
  preco: string;
  desconto: string;
  dataCadastro: string;

  constructor() {
    this.produto = new Produto();
  }
}
