import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private API = 'http://localhost:3000/tasks';

  constructor(private htpp: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.htpp.get<Task[]>(this.API);
  }

  getById(id: string): Observable<Task> {
    return this.htpp.get<Task>(`${this.API}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.htpp.post<Task>(this.API, task);
  }

  update(task: Task): Observable<Task> {
    return this.htpp.put<Task>(`${this.API}/${task.id}`, task);
  }

  delete(id:string): Observable<void> {
    return this.htpp.delete<void>(`${this.API}/${id}`);
  }
}
