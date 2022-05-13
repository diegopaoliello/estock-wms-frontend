import { Chart } from 'chart.js';
import { UsuarioService } from './../cadastros/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuarioLogado: string;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe((usuario) => {
      this.usuarioLogado = usuario.nome + ' ' + usuario.sobrenome + ' (' + usuario.perfil.descricao + ')';
    });

  }
}
