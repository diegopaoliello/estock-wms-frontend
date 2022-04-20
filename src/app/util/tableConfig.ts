export class TableConfig {
  title: string;
  exportColumns: number[] = [];

  constructor(title: string, exportColumns: number[]) {
    this.title = title;
    this.exportColumns = exportColumns;
  }
}
