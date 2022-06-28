import { DataTableUtil } from './../../../util/DataTableUtil';
import { TableConfig } from './../../../util/tableConfig';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
declare var $: any;

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  tableConfig: TableConfig = new TableConfig('Lista de clientes', [0, 1, 2], null);

  constructor(private service: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((resposta) => {
        this.clientes = resposta;
        DataTableUtil.enableTable(this.tableConfig);
      });
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.service.deletar(this.clienteSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.')
    );
  }
}
