import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutentificarLoginService {

  private apiUrl = 'https://backend-3-8sqc.onrender.com/'
  constructor(private http: HttpClient) { }

  BuscarDadosDaAPi(usario: Usuario): Observable<Usuario> {
    return this.http.post(this.apiUrl, usario)
  }
}
