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

  salvar(entrada: EstoqueEntrada): Observable<EstoqueEntrada> {
    return this.http.post<EstoqueEntrada>(`${this.apiURL}`, entrada);
  }
  getEntradasEstoque(): Observable<EstoqueEntrada[]> {
    return this.http.get<EstoqueEntrada[]>(this.apiURL);
  }

  getEntradaEstoqueById(id: number): Observable<EstoqueEntrada> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
}
