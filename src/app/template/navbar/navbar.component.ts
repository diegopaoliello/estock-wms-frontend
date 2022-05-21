import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../cadastros/usuario/usuario';
import { UsuarioService } from './../../cadastros/usuario/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  usuarioDescricao: string;
  usuarioAutenticado: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioAutenticado = this.usuarioService.getUsuarioSessao();
    this.usuarioDescricao = this.usuarioAutenticado.nome + ' (' + this.usuarioAutenticado.perfil.descricao + ')';

    this.usuarioService.usuarioAutenticado.subscribe((usuario: Usuario) => {
      this.usuarioAutenticado = usuario;
      this.usuarioService.setUsuarioSessao(this.usuarioAutenticado);
      this.usuarioDescricao = this.usuarioAutenticado.nome + ' (' + this.usuarioAutenticado.perfil.descricao + ')';
    });
  }
}
