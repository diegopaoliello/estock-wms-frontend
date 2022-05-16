import { PerfilAutorizacao } from './perfil-autorizacao';

export class Perfil {
  id: number;
  codigo: string;
  permiteInserirEntradaEstoque: false;
  autorizacoes: PerfilAutorizacao[];
  descricao: string;

  constructor() {
    this.autorizacoes = [];
  }
}
