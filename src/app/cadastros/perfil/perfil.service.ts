import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Perfil } from './perfil';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  apiURL: string = environment.apiURLBase + '/api/perfis';

  constructor(private http: HttpClient) { }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiURL);
  }
}
