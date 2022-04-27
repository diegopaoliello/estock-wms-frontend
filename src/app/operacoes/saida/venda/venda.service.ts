import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Venda } from '../venda/venda';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  apiURL: string = environment.apiURLBase + '/api/vendas';

  constructor(private http: HttpClient) { }

  salvar(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${this.apiURL}`, venda);
  }

  atualizar(venda: Venda): Observable<any> {
    return this.http.put<Venda>(`${this.apiURL}/${venda.id}`, venda);
  }

  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiURL);
  }

  getVendaById(id: number): Observable<Venda> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(venda: Venda): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${venda.id}`);
  }

  aprovar(venda: Venda): Observable<any> {
    return this.http.patch<Venda>(`${this.apiURL}/${venda.id}/${'aprovar'}`, null);
  }

  reprovar(venda: Venda): Observable<any> {
    return this.http.patch<Venda>(`${this.apiURL}/${venda.id}/${'reprovar'}`, venda);
  }
}
