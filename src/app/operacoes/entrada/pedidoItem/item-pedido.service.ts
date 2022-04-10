import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ItemPedido } from '../pedidoItem/item-pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemPedidoService {
  apiURL: string = environment.apiURLBase + '/api/pedidos/{id}/itens-pedido';

  constructor(private http: HttpClient) { }

  salvar(idPedido: number, itemPedido: ItemPedido): Observable<ItemPedido> {
    return this.http.post<ItemPedido>(`${this.apiURL.replace('{id}', idPedido.toString())}`, itemPedido);
  }

  atualizar(itemPedido: ItemPedido): Observable<any> {
    return this.http.put<ItemPedido>(`${this.apiURL.replace('{id}', itemPedido.pedido.id.toString())}/${itemPedido.id}`, itemPedido);
  }

  getItensPedido(idPedido: number): Observable<ItemPedido[]> {
    const httpParams = new HttpParams()
      .set('idPedido', idPedido.toString());

    const url = this.apiURL.replace('{id}', idPedido.toString()) + '?' + httpParams.toString();
    return this.http.get<any>(url);
  }

  getItemPedidoById(idPedido: number, id: number): Observable<ItemPedido> {
    return this.http.get<any>(`${this.apiURL.replace('{id}', idPedido.toString())}/${id}`);
  }

  deletar(itemPedido: ItemPedido): Observable<any> {
    return this.http.delete<any>(`${this.apiURL.replace('{id}', itemPedido.pedido.id.toString().toString())}/${itemPedido.id}`);
  }
}
