declare var $: any;

export class Util {
  static atualizaDataTable(): void {
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
  }
}
