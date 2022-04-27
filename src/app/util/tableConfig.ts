export class TableConfig {
  title: string;
  exportColumns: number[] = [];
  tableHeader: Object;

  constructor(title: string, exportColumns: number[], tableHeader: Object) {
    this.title = title;
    this.exportColumns = exportColumns;
    this.tableHeader = tableHeader;
  }

}
