import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Estoque } from './estoque';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  apiURL: string = environment.apiURLBase + '/api/estoques';

  constructor(private http: HttpClient) { }

  getEstoques(idProduto: number, quantidade: number): Observable<Estoque[]> {
    const httpParams = new HttpParams()
      .set('idProduto', idProduto ? idProduto.toString() : "")
      .set('quantidade', quantidade ? quantidade.toString() : "");

    const url = this.apiURL + '?' + httpParams.toString();
    return this.http.get<any>(url);
  }
}
