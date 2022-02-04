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
export class LoginComponent implements OnInit, DoCheck {
  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];
  socialUser: SocialUser;
  isLoggedin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.isLoggedin = false;

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;

      console.log(this.socialUser);
    });
  }

  ngDoCheck() {
    console.log('ngDoCheck');
    console.log(this.isLoggedin);
    let existsUser: boolean = false; 

    if (this.isLoggedin) {
      console.log('ngDoCheck in');
      this.isLoggedin = false;
      this.username = this.socialUser.email;
      this.password = this.socialUser.id;
      existsUser = this.existsUser(this.username);

      console.log('existsUser:' + existsUser);

      if (!existsUser) {
        console.log('entrou cadastrar');
        this.cadastrar();
      }

      this.login();
    }
  }

  onSubmit() {
    this.login();
  }

  login(): void {
    console.log('login');
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

  existsUser(username: string): boolean {
    let saida: boolean = false;

    console.log('existsUser');
    
    this.authService.getUsuario(username).subscribe(
      (response) => {
        console.log('response' + response);
        saida = true;
      }
    );

    return saida;
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
    console.log('cadastrando...');
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
  }
}
