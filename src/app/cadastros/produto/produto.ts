import { Categoria } from "../categoria/categoria";
import { UnidadeMedida } from "../unidade-medida/unidade-medida";

export class Produto {
  id: number;
  descricao: string;
  codigo: string;
  categoria: Categoria;
  unidadeMedida: UnidadeMedida;
  dataCadastro: string;

  constructor() {
    this.unidadeMedida = new UnidadeMedida();
    this.categoria = new Categoria();
  }
}
