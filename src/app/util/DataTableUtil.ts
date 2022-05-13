import { environment } from 'src/environments/environment';
import { TableConfig } from './tableConfig';
declare var $: any;

export class DataTableUtil {

  static enableTable(tableConfig: TableConfig): void {
    let title: string = tableConfig.title;
    let tamanhoColunas: string;
    let iDataTableElement: number = 1;

    tamanhoColunas = String(100 / tableConfig.exportColumns.length) + '%';

    $(function () {
      var table = $('#dataTable').DataTable({
        'retrieve': true,
        'responsive': true,
        'lengthChange': false,
        'buttons': [
          {
            'extend': 'print',
            'title': title,
            'exportOptions': {
              'columns': tableConfig.exportColumns
            }
          },
          {
            'extend': 'excel',
            'title': title,
            'exportOptions': {
              'columns': tableConfig.exportColumns
            }
          },
          {
            'extend': 'pdf',
            'title': title,
            'customize': function (doc) {

              if (tableConfig.tableHeader) {
                let content = doc.content;
                let dataTable = content[1];

                content.push(tableConfig.tableHeader);

                content[1] = content[2];
                content[2] = dataTable;

                iDataTableElement++;
              }

              var cols = [];
              cols[0] = { text: 'Left part', alignment: 'left', margin: [20] };
              cols[1] = { text: 'Right part', alignment: 'right', margin: [0, 0, 20] };
              var objFooter = {};
              objFooter['columns'] = cols;
              doc['footer'] = objFooter;
              doc.content[iDataTableElement].table.widths = tamanhoColunas,

                doc.content.splice(1, 0, {
                  'margin': [-25, -60, 0, 30],
                  'alignment': 'top',
                  'fit': [100, 100],
                  'image': 'data:image/png;base64,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'
                });
            },
            'exportOptions': {
              'columns': tableConfig.exportColumns
            }
          }
        ],
        'language': {
          "emptyTable": "Nenhum registro encontrado",
          "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          "infoEmpty": "Mostrando 0 até 0 de 0 registros",
          "infoFiltered": "(Filtrados de _MAX_ registros)",
          "infoThousands": ".",
          "loadingRecords": "Carregando...",
          "processing": "Processando...",
          "zeroRecords": "Nenhum registro encontrado",
          "search": "Pesquisar",
          "paginate": {
            "next": "Próximo",
            "previous": "Anterior",
            "first": "Primeiro",
            "last": "Último"
          },
          "aria": {
            "sortAscending": ": Ordenar colunas de forma ascendente",
            "sortDescending": ": Ordenar colunas de forma descendente"
          },
          "buttons": {
            "copySuccess": {
              "1": "Uma linha copiada com sucesso",
              "_": "%d linhas copiadas com sucesso"
            },
            "collection": "Coleção  <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
            "colvis": "Visibilidade da Coluna",
            "colvisRestore": "Restaurar Visibilidade",
            "copy": "Copiar",
            "copyKeys": "Pressione ctrl ou u2318 + C para copiar os dados da tabela para a área de transferência do sistema. Para cancelar, clique nesta mensagem ou pressione Esc..",
            "copyTitle": "Copiar para a Área de Transferência",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
              "-1": "Mostrar todos os registros",
              "_": "Mostrar %d registros"
            },
            "pdf": "PDF",
            "print": "Imprimir",
            "createState": "Criar estado",
            "removeAllStates": "Remover todos os estados",
            "removeState": "Remover",
            "renameState": "Renomear",
            "savedStates": "Estados salvos",
            "stateRestore": "Estado %d",
            "updateState": "Atualizar"
          }
        }
      });

      table.buttons().container()
        .appendTo('#dataTable_wrapper .col-md-6:eq(0)');

      $('#dataTable').on('click', '.delete', function () {
        var table = $('#dataTable').DataTable();
        table
          .row($(this).parents('tr'))
          .remove()
          .draw();
      });
    });

  }
}
