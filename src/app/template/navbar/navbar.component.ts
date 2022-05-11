import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth.service';
import { Usuario } from './../../cadastros/usuario/usuario';
import { UsuarioService } from './../../cadastros/usuario/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  usuario: string;
  usuarioLogado: Usuario = new Usuario;

  constructor(private authService: AuthService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioAutenticado();
    this.usuarioService.getUsuarioAutenticado().subscribe((usuario) => {
      this.usuarioLogado = usuario;
    });
  }
}
