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

  constructor(private service: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((resposta) => {
        this.clientes = resposta;
        $(function () {
          $('#dataTable').DataTable({
            'retrieve': true,
            'language': {
              'url': '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-BR.json'
            },
            'responsive': true
          });

          $('#dataTable').on('click', '.delete', function () {
            var table = $('#dataTable').DataTable();
            table
              .row($(this).parents('tr'))
              .remove()
              .draw();
          });
        });
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
