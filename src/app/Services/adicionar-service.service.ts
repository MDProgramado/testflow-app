import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class AdicionarServiceService {

  private url = 'http://localhost:3000/tasks';
  constructor(private htpp: HttpClient) { }

  AdicionarTarefa(task: Task): Observable<Task> {
    return this.htpp.post<Task>(this.url, task);
  }
}
