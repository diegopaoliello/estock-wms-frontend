import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ItemPedido } from '../pedidoItem/item-pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemPedidoService {
  apiURL: string = environment.apiURLBase + '/api/pedidos/{id}/itens-pedido';

  constructor(private http: HttpClient) { }

  salvar(itemPedido: ItemPedido): Observable<ItemPedido> {
    return this.http.post<ItemPedido>(`${this.apiURL.replace('{id}', itemPedido.pedido.id.toString())}`, itemPedido);
  }

  atualizar(itemPedido: ItemPedido): Observable<any> {
    return this.http.put<ItemPedido>(`${this.apiURL.replace('{id}', itemPedido.pedido.id.toString())}/${itemPedido.id}`, itemPedido);
  }

  getItensPedido(idPedido: number): Observable<ItemPedido[]> {
    return this.http.get<ItemPedido[]>(this.apiURL.replace('{id}', idPedido.toString()));
  }

  getItemPedidoById(idPedido: number, id: number): Observable<ItemPedido> {
    return this.http.get<any>(`${this.apiURL.replace('{id}', idPedido.toString())}/${id}`);
  }

  deletar(itemPedido: ItemPedido): Observable<any> {
    return this.http.delete<any>(`${this.apiURL.replace('{id}', itemPedido.pedido.id.toString().toString())}/${itemPedido.id}`);
  }
}
