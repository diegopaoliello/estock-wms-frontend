import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fornecedor } from './fornecedor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  apiURL: string = environment.apiURLBase + '/api/fornecedores';

  constructor(private http: HttpClient) {}

  salvar(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.apiURL}`, fornecedor);
  }

  atualizar(fornecedor: Fornecedor): Observable<any> {
    return this.http.put<Fornecedor>(
      `${this.apiURL}/${fornecedor.id}`,
      fornecedor
    );
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiURL);
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(fornecedor: Fornecedor): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${fornecedor.id}`);
  }
}
