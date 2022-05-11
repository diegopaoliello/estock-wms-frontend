import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) { }

  atualizar(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(
      this.apiURL,
      usuario
    );
  }

  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<any>(this.apiURL);
  }
}
