import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pedido } from '../pedido/pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  apiURL: string = environment.apiURLBase + '/api/pedidos';

  constructor(private http: HttpClient) { }

  salvar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiURL}`, pedido);
  }

  atualizar(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(`${this.apiURL}/${pedido.id}`, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiURL);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(pedido: Pedido): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${pedido.id}`);
  }

  aprovar(pedido: Pedido): Observable<any> {
    return this.http.patch<Pedido>(`${this.apiURL}/${pedido.id}/${'aprovar'}`, null);
  }

  reprovar(pedido: Pedido): Observable<any> {
    return this.http.patch<Pedido>(`${this.apiURL}/${pedido.id}/${'reprovar'}`, pedido);
  }
}
