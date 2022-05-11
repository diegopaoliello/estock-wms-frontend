import { Cliente } from 'src/app/cadastros/clientes/cliente';
import { VendaStatus } from 'src/app/cadastros/venda-status/venda-status';

export class Venda {
  id: number;
  status: VendaStatus;
  cliente: Cliente;
  dataCadastro: string;

  constructor() {
    this.cliente = new Cliente();
  }
}
