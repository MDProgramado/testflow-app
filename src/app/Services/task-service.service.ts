import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../interfaces/Task';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$: Observable<any[]> = this.tasksSubject.asObservable();
  private API = 'https://backendd-01jm.onrender.com/tasks';

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  create(task: Task): Observable<Task> {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);

    this.notificationService.showNotification(`Tarefa '${task.title}' foi criada!`, 'info');

     return of(task)
  }

  checkTaskDeadLines(tasks: Task[]):void {
    const currentDate = new Date();
    tasks.forEach(task => {
      if(task.status !== "Concluída") {
        const deadLineDate = new Date(task.dueDate);
        const timeDiff = deadLineDate.getTime() - currentDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        if(dayDiff <= 2 && dayDiff >= 0) {
          this.notificationService.showNotification(`Tarefa '${task.title}' está perto do prazo de conclusão!`, 'warning');
        }
        else if (dayDiff < 0) {
          this.notificationService.showNotification(`Tarefa '${task.title}' ultrapassou o prazo!`, 'error');

        }
      }
    });
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}`, task);
  }

  delete(id:string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
