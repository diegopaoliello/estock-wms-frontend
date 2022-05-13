import { PerfilService } from './../../perfil/perfil.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Perfil } from '../../perfil/perfil';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  usuario: Usuario;
  success: boolean = false;
  errors: String[];
  id: number;
  perfis: Perfil[] = [];

  constructor(
    private service: UsuarioService,
    private perfilService: PerfilService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.service.getUsuarioAutenticado().subscribe(
      (response) => (this.usuario = response),
      (errorResponse) => (this.usuario = new Usuario())
    );

    this.perfilService
      .getPerfis()
      .subscribe((response) => (this.perfis = response));
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.service.atualizar(this.usuario).subscribe(
      (response) => {
        this.success = true;
        this.errors = null;
      },
      (errorResponse) => {
        this.errors = ['Erro ao atualizar a usuario.'];
      }
    );
  }
}
