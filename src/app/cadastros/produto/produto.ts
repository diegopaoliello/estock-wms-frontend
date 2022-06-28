import { Categoria } from "../categoria/categoria";
import { UnidadeMedida } from "../unidade-medida/unidade-medida";

export class Produto {
  id: number;
  descricao: string;
  codigo: string;
  categoria: Categoria;
  unidadeMedida: UnidadeMedida;
  quantidadeMinima: number;
  quantidadeMaxima: number;
  precoMedio: string;
  dataCadastro: string;

  constructor() {
    this.categoria = new Categoria();
  }
}
