import { UsuarioService } from './../../cadastros/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/cadastros/usuario/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  usuarioAutenticado: Usuario = new Usuario();
  exibeMenuPrincipal: boolean = false;
  exibeMenuCadastros: boolean = false;
  exibeMenuOperEntrada: boolean = false;
  exibeMenuOperSaida: boolean = false;
  exibeMenuEntradaManual: boolean = false;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioAutenticado = JSON.parse(localStorage.getItem('usuario_autenticado'));

    this.usuarioService.usuarioAutenticado.subscribe((usuario: Usuario) => {
      this.usuarioAutenticado = usuario;
      console.log('aqui 1');
      this.validaAcessos();
    });
    console.log('aqui 2');
    this.validaAcessos();
  }

  validaAcessos(): void {
    this.exibeMenuPrincipal = this.usuarioService.temAutorizacao(this.usuarioAutenticado, 'MENU_PRINCIPAL', 'VISUALIZAR');
    this.exibeMenuCadastros = this.usuarioService.temAutorizacao(this.usuarioAutenticado, 'MENU_CADASTROS', 'VISUALIZAR');
    this.exibeMenuOperEntrada = this.usuarioService.temAutorizacao(this.usuarioAutenticado, 'MENU_OPER_ENTRADA', 'VISUALIZAR');
    this.exibeMenuOperSaida = this.usuarioService.temAutorizacao(this.usuarioAutenticado, 'MENU_OPER_SAIDA', 'VISUALIZAR');
    this.exibeMenuEntradaManual = this.usuarioService.temAutorizacao(this.usuarioAutenticado, 'ENTRADA_ESTOQUE', 'VISUALIZAR');
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
