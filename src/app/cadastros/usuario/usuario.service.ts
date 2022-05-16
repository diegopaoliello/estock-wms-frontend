import { PerfilAutorizacao } from './../perfil/perfil-autorizacao';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';
  usuarioAutenticado: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  usuarioSessao: Usuario = new Usuario();

  constructor(private http: HttpClient) { }

  atualizar(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(
      this.apiURL,
      usuario
    );
  }

  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<any>(this.apiURL);
  }

  setUsuarioSessao(usuario: Usuario) {
    localStorage.setItem('usuario_autenticado', JSON.stringify(usuario));
    this.usuarioSessao = usuario;
  }

  getUsuarioSessao(): Usuario {
    return JSON.parse(localStorage.getItem('usuario_autenticado'));
  }

  temAutorizacao(usuario: Usuario, nomeAutorizacao: string, nomeAcao: string): boolean {
    let temAcesso: boolean = false;

    if (!usuario) {
      usuario = this.getUsuarioSessao();
    }

    if (usuario.perfil.autorizacoes) {
      let autorizacao: PerfilAutorizacao = usuario.perfil.autorizacoes.find(
        autorizacao => autorizacao.nome === nomeAutorizacao);

      if (autorizacao && autorizacao.acoes) {
        if (autorizacao.acoes.find(
          acao => acao === nomeAcao)) {
          temAcesso = true;
        }
      }
    }

    return temAcesso;
  }
}
