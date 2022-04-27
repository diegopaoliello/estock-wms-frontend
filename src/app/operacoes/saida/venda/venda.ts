import { Cliente } from 'src/app/cadastros/clientes/cliente';

export class Venda {
  id: number;
  status: string;
  cliente: Cliente;
  dataCadastro: string;
}
