import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificarLoginService {

  private apiUrl = 'https://backendd-01jm.onrender.com/users'
  constructor(private http: HttpClient) { }

  BuscarDadosDaAPi(usario: Usuario): Observable<Usuario> {
    return this.http.post(this.apiUrl, usario)
  }
}
