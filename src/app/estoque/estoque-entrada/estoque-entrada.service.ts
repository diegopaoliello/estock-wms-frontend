import { EstoqueEntradaManual } from './estoque-entrada-manual';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EstoqueEntrada } from './estoque-entrada';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstoqueEntradaService {
  apiURL: string = environment.apiURLBase + '/api/entradas-estoque';

  constructor(private http: HttpClient) { }

  salvar(entrada: EstoqueEntradaManual): Observable<EstoqueEntradaManual> {
    return this.http.post<EstoqueEntradaManual>(`${this.apiURL}`, entrada);
  }
  getEntradasEstoque(): Observable<EstoqueEntrada[]> {
    return this.http.get<EstoqueEntrada[]>(this.apiURL);
  }
}
