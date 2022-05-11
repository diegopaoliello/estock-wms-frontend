import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { VendaStatus } from './venda-status';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendaStatusService {
  apiURL: string = environment.apiURLBase + '/api/vendas-status';

  constructor(private http: HttpClient) { }

  getVendaStatus(): Observable<VendaStatus[]> {
    return this.http.get<VendaStatus[]>(this.apiURL);
  }
}
