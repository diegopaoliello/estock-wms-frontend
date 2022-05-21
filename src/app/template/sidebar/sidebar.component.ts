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
  exibeMenuCadastro: boolean = false;
  exibeMenuPedido: boolean = false;
  exibeMenuVenda: boolean = false;
  exibeMenuEstoque: boolean = false;
  exibeMenuEstoqueEntrada: boolean = false;
  exibeMenuEstoqueSaida: boolean = false;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioAutenticado = this.usuarioService.getUsuarioSessao();

    this.usuarioService.usuarioAutenticado.subscribe((usuario: Usuario) => {
      this.usuarioAutenticado = usuario;
      this.usuarioService.setUsuarioSessao(this.usuarioAutenticado);
      this.validaAcessos();
    });

    this.validaAcessos();
  }

  validaAcessos(): void {
    this.exibeMenuCadastro = this.usuarioService.temAutorizacao('CADASTRO', 'VISUALIZAR');
    this.exibeMenuPedido = this.usuarioService.temAutorizacao('PEDIDO', 'VISUALIZAR');
    this.exibeMenuVenda = this.usuarioService.temAutorizacao('VENDA', 'VISUALIZAR');
    this.exibeMenuEstoque = this.usuarioService.temAutorizacao('ESTOQUE', 'VISUALIZAR');
    this.exibeMenuEstoqueEntrada = this.usuarioService.temAutorizacao('ESTOQUE_ENTRADA', 'INSERIR');
    this.exibeMenuEstoqueSaida = this.usuarioService.temAutorizacao('ESTOQUE_ENTRADA', 'VISUALIZAR');
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
