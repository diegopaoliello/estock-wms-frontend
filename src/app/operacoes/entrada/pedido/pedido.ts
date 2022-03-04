import { Fornecedor } from 'src/app/cadastros/fornecedor/fornecedor';

export class Pedido {
  id: number;
  status: string;
  fornecedor: Fornecedor;
  dataCadastro: string;
}
