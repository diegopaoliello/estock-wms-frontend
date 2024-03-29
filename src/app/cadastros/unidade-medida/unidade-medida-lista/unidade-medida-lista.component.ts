import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadeMedida } from '../unidade-medida';
import { UnidadeMedidaService } from '../unidade-medida.service';
declare var $: any;

@Component({
  selector: 'app-unidade-medida-lista',
  templateUrl: './unidade-medida-lista.component.html',
  styleUrls: ['./unidade-medida-lista.component.css'],
})
export class UnidadeMedidaListaComponent implements OnInit {
  unidadesMedida: UnidadeMedida[] = [];
  unidadeMedidaSelecionado: UnidadeMedida;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Lista de unidades de medida', [0, 1, 2], null);

  constructor(private service: UnidadeMedidaService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getUnidadesMedida()
      .subscribe((resposta) => {
        this.unidadesMedida = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/unidades-medida/form']);
  }

  preparaDelecao(unidadeMedida: UnidadeMedida) {
    this.unidadeMedidaSelecionado = unidadeMedida;
  }

  deletarUnidadeMedida() {
    this.service.deletar(this.unidadeMedidaSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Unidade de medida deletada com sucesso!';
        this.ngOnInit();
      },
      (erro) =>
        (this.mensagemErro = 'Ocorreu um erro ao deletar a unidade de medida.')
    );
  }
}
