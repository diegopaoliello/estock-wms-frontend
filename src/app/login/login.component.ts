import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];
  socialUser: SocialUser;
  usuario: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;

      if (!this.authService.isLogoutAction) {
        this.username = this.socialUser.email;
        this.password = this.socialUser.id;

        this.cadastrar();
      }
    });
  }

  onSubmit() {
    this.login();
  }

  login(): void {
    this.authService.tentarLogar(this.username, this.password).subscribe(
      (response) => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/home']);
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
    this.authService.getUsuario(this.username).subscribe(
      (response) => {
        this.usuario = response;
        this.password = this.usuario.password;
      },
      (errorResponse) => {
        const usuario: Usuario = new Usuario();
        usuario.username = this.username;
        usuario.password = this.password;

        this.authService.salvar(usuario).subscribe(
          (response) => {
            this.mensagemSucesso =
              'Cadastro realizado com sucesso! Efetue o login.';
            this.cadastrando = false;
            this.username = '';
            this.password = '';
            this.errors = [];
          },
          (errorResponse) => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
          }
        );
      },
      () => {
        if (this.errors == undefined) {
          this.login();
        }
      }
    );
  }
}
