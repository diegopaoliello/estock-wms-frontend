import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ItemVenda } from './item-venda';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemVendaService {
  apiURL: string = environment.apiURLBase + '/api/vendas/{id}/itens';

  constructor(private http: HttpClient) { }

  salvar(idVenda: number, itemVenda: ItemVenda): Observable<ItemVenda> {
    return this.http.post<ItemVenda>(`${this.apiURL.replace('{id}', idVenda.toString())}`, itemVenda);
  }

  atualizar(itemVenda: ItemVenda): Observable<any> {
    return this.http.put<ItemVenda>(`${this.apiURL.replace('{id}', itemVenda.venda.id.toString())}/${itemVenda.id}`, itemVenda);
  }

  getItensVenda(idVenda: number): Observable<ItemVenda[]> {
    const httpParams = new HttpParams()
      .set('idVenda', idVenda.toString());

    const url = this.apiURL.replace('{id}', idVenda.toString()) + '?' + httpParams.toString();
    return this.http.get<any>(url);
  }

  getItemVendaById(idVenda: number, id: number): Observable<ItemVenda> {
    return this.http.get<any>(`${this.apiURL.replace('{id}', idVenda.toString())}/${id}`);
  }

  deletar(itemVenda: ItemVenda): Observable<any> {
    return this.http.delete<any>(`${this.apiURL.replace('{id}', itemVenda.venda.id.toString().toString())}/${itemVenda.id}`);
  }
}
