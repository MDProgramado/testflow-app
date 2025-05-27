import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private API = 'https://backendd-01jm.onrender.com/tasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task);
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}`, task);
  }

  delete(id:string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
