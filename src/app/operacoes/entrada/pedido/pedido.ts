import { PedidoStatus } from 'src/app/cadastros/pedido-status/pedido-status';

import { Fornecedor } from 'src/app/cadastros/fornecedor/fornecedor';

export class Pedido {
  id: number;
  status: PedidoStatus;
  fornecedor: Fornecedor;
  dataCadastro: string;

  constructor() {
    this.fornecedor = new Fornecedor();
    this.status = new PedidoStatus();
  }
}
