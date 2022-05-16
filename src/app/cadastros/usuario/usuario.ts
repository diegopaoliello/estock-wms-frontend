import { TipoLogin } from './../tipo-login/tipo-login';
import { Perfil } from './../perfil/perfil';
export class Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
  perfil: Perfil;
  tipoLogin: TipoLogin;
  dataCadastro: string;

  constructor() {
    this.tipoLogin = new TipoLogin();
  }
}
