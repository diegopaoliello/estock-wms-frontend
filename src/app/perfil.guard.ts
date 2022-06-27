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
  constructor(private router: Router, private usuarioService: UsuarioService) { }

  temAcesso: boolean = false;
  usuarioAutenticado: Usuario;

  canActivate(route: ActivatedRouteSnapshot): boolean {

    route.data.acoes.forEach((acao: string) => {
      this.temAcesso = this.usuarioService.temAutorizacao(route.data.autorizacao, acao);
    });

    if (this.temAcesso) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
