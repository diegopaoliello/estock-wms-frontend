
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './../cadastros/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiURL: string = environment.apiURLBase + '/api/login';

  constructor(private http: HttpClient) { }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiURL}`, usuario);
  }

  existeUsuario(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${email}`);
  }
}
