import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { EstoqueSaida } from './estoque-saida';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstoqueSaidaService {
  apiURL: string = environment.apiURLBase + '/api/saidas-estoque';

  constructor(private http: HttpClient) { }

  getSaidasEstoque(): Observable<EstoqueSaida[]> {
    return this.http.get<EstoqueSaida[]>(this.apiURL);
  }

  getSaidaEstoqueById(id: number): Observable<EstoqueSaida> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }
}
