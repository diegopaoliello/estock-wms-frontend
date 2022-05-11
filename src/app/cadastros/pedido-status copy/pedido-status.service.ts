import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PedidoStatus } from './pedido-status';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoStatusService {
  apiURL: string = environment.apiURLBase + '/api/pedidos-status';

  constructor(private http: HttpClient) { }

  getPedidoStatus(): Observable<PedidoStatus[]> {
    return this.http.get<PedidoStatus[]>(this.apiURL);
  }
}
