import { ItemVenda } from './../../operacoes/saida/vendaItem/item-venda';
import { Produto } from './../../cadastros/produto/produto';

export class EstoqueSaida {
  id: number;
  dataCadastro: string;
  itemVenda: ItemVenda;
}
