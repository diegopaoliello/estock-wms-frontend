import { PerfilAutorizacao } from './../../../cadastros/perfil/perfil-autorizacao';
import { UsuarioService } from './../../../cadastros/usuario/usuario.service';
import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstoqueEntrada } from '../estoque-entrada';
import { EstoqueEntradaService } from '../estoque-entrada.service';
import { Usuario } from 'src/app/cadastros/usuario/usuario';
declare var $: any;

@Component({
  selector: 'app-estoque-entrada-lista',
  templateUrl: './estoque-entrada-lista.component.html',
  styleUrls: ['./estoque-entrada-lista.component.css'],
})
export class EstoqueEntradaListaComponent implements OnInit {
  entradasEstoque: EstoqueEntrada[] = [];
  entradaEstoqueSelecionado: EstoqueEntrada;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Entradas de Estoque', [0, 1, 2, 3, 4], null);
  usuarioAutenticado: Usuario = new Usuario();
  permiteInserir: boolean = false;

  constructor(private service: EstoqueEntradaService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.validaAcessos();

    this.service
      .getEntradasEstoque()
      .subscribe((resposta) => {
        this.entradasEstoque = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  validaAcessos(): void {
    this.permiteInserir = this.usuarioService.temAutorizacao('ESTOQUE_ENTRADA', 'INSERIR');
  }

  novoCadastro() {
    this.router.navigate(['/entradas-estoque/form']);
  }
}
