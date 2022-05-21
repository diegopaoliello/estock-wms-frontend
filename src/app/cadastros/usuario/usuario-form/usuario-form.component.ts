import { PerfilService } from './../../perfil/perfil.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

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
  perfilSelecionado: Perfil;

  constructor(
    private service: UsuarioService,
    private perfilService: PerfilService,
    private _location: Location
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.service.getUsuarioAutenticado().subscribe(
      (response) => {
        this.usuario = response;
        this.perfilSelecionado = this.usuario.perfil;
      },
      (errorResponse) => (this.usuario = new Usuario())
    );

    this.perfilService
      .getPerfis()
      .subscribe((response) => (this.perfis = response));
  }

  voltarParaHome() {
    this._location.back();
  }

  onSubmit() {
    if (this.perfilSelecionado.id) {
      this.usuario.perfil = this.perfilSelecionado;
    }

    this.service.atualizar(this.usuario).subscribe(
      (response) => {
        this.success = true;
        this.errors = null;

        this.service.getUsuarioAutenticado().subscribe((usuario) => {
          this.service.setUsuarioSessao(this.usuario);
          this.service.usuarioAutenticado.emit(usuario);
        });
      },
      (errorResponse) => {
        this.errors = ['Erro ao atualizar a usuario.'];
      }
    );
  }
}
