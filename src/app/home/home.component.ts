import { Chart } from 'chart.js';
import { UsuarioService } from './../cadastros/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../cadastros/usuario/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuarioDescricao: string;
  usuarioAutenticado: Usuario = new Usuario();

  constructor() { }

  ngOnInit(): void {
    this.usuarioAutenticado = JSON.parse(localStorage.getItem('usuario_autenticado'));
    this.usuarioDescricao = this.usuarioAutenticado.nome;
  }
}
