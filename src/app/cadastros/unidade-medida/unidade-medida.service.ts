import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UnidadeMedida } from '../unidade-medida/unidade-medida';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadeMedidaService {
  apiURL: string = environment.apiURLBase + '/api/unidades-medida';

  constructor(private http: HttpClient) {}

  salvar(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(`${this.apiURL}`, unidadeMedida);
  }

  atualizar(unidadeMedida: UnidadeMedida): Observable<any> {
    return this.http.put<UnidadeMedida>(
      `${this.apiURL}/${unidadeMedida.id}`,
      UnidadeMedida
    );
  }

  getUnidadesMedida(): Observable<UnidadeMedida[]> {
    return this.http.get<UnidadeMedida[]>(this.apiURL);
  }

  getUnidadeMedidaById(id: number): Observable<UnidadeMedida> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(unidadeMedida: UnidadeMedida): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${unidadeMedida.id}`);
  }
}
