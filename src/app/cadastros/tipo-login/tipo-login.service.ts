import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TipoLogin } from './tipo-login';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoLoginService {
  apiURL: string = environment.apiURLBase + '/api/tipos-login';

  constructor(private http: HttpClient) { }

  getTiposLogin(): Observable<TipoLogin[]> {
    return this.http.get<TipoLogin[]>(this.apiURL);
  }
}
