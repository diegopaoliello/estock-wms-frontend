import { UsuarioService } from './../cadastros/usuario/usuario.service';
import { PerfilService } from './../cadastros/perfil/perfil.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../cadastros/usuario/usuario';
import { AuthService } from '../auth.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { TipoLogin } from './../cadastros/tipo-login/tipo-login';
import { Perfil } from './../cadastros/perfil/perfil';
import { TipoLoginService } from './../cadastros/tipo-login/tipo-login.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];
  socialUser: SocialUser;
  existsUserName: Boolean = false;

  constructor(
    private service: LoginService,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private socialAuthService: SocialAuthService,

  ) { this.usuario = new Usuario(); }

  ngOnInit() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario_autenticado');

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;

      if (!this.authService.isLogoutAction) {
        this.usuario.email = this.socialUser.email;
        this.usuario.password = this.socialUser.id;
        this.usuario.nome = this.socialUser.name;
        this.usuario.sobrenome = this.socialUser.lastName;

        this.cadastrarGoogle();
      }
    });
  }

  onSubmit() {
    this.login();
  }

  login(): void {
    this.authService.tentarLogar(this.usuario.email, this.usuario.password).subscribe(
      (response) => {
        let access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);

        this.usuarioService.getUsuarioAutenticado().subscribe((usuario) => {
          this.usuarioService.setUsuarioSessao(usuario);
          this.router.navigate(['/home']);
        });
      },
      (errorResponse) => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      }
    );
  }

  loginGoogle(event): void {
    event.preventDefault();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    this.usuario.tipoLogin.id = 1;

    this.service.salvar(this.usuario).subscribe(
      (response) => {
        this.mensagemSucesso =
          'Cadastro realizado com sucesso! Efetue o login.';
        this.cadastrando = false;
        this.usuario.email = '';
        this.usuario.password = '';
        this.errors = [];
      },
      (errorResponse) => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      }
    );
  }

  cadastrarGoogle() {
    this.service.existeUsuario(this.usuario.email).subscribe(
      (response) => {
        document.getElementById("btnEntrar").click();
      },
      (errorResponse) => {
        this.usuario.tipoLogin.id = 2;

        this.service.salvar(this.usuario).subscribe(
          (response) => {
            this.errors = [];
            document.getElementById("btnEntrar").click();
          },
          (errorResponse) => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
          }
        );
      }
    );
  }
}
