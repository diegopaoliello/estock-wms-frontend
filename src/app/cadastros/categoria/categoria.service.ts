import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiURL: string = environment.apiURLBase + '/api/categorias';

  constructor(private http: HttpClient) {}

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiURL}`, categoria);
  }

  atualizar(categoria: Categoria): Observable<any> {
    return this.http.put<Categoria>(
      `${this.apiURL}/${categoria.id}`,
      categoria
    );
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiURL);
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(categoria: Categoria): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${categoria.id}`);
  }
}
