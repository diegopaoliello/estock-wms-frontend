import { UsuarioService } from './cadastros/usuario/usuario.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from './cadastros/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class PerfilGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) { }

  temAcesso: boolean = false;
  usuarioAutenticado: Usuario;

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.usuarioAutenticado = JSON.parse(localStorage.getItem('usuario_autenticado'));

    this.usuarioService.usuarioAutenticado.subscribe((usuario: Usuario) => {
      this.usuarioAutenticado = usuario;
      this.temAcesso = this.usuarioService.temAutorizacao(this.usuarioAutenticado, route.data.autorizacao, route.data.acao);
    });

    this.temAcesso = this.usuarioService.temAutorizacao(this.usuarioAutenticado, route.data.autorizacao, route.data.acao);

    if (this.temAcesso) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
