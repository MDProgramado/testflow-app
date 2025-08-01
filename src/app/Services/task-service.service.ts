import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import {  Task } from '../interfaces/Task';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable(); 
  private API = 'https://backendd-01jm.onrender.com/tasks';

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.API);
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.API, task).pipe(
      tap((createdTask: Task) => {
        this.notificationService.showNotification(
          `Tarefa '${createdTask.title}' foi criada com sucesso!`,
          'info',
          {
            link: `/tasks/${createdTask.id}` // Link para a página de detalhe
          }
        );
      })
    );
  }

  checkTaskDeadLines(tasks: Task[]): void {
    const currentDate = new Date();
    tasks.forEach(task => {
      if (task.status !== "Concluída") {
        const deadLineDate = new Date(task.dueDate);
        if (isNaN(deadLineDate.getTime())) return;

        const timeDiff = deadLineDate.getTime() - currentDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        const notificationKey = `notified_${task.id}`;
        if (sessionStorage.getItem(notificationKey)) {
          return;
        }

        // Alerta para tarefas perto do prazo (amarelo)
        if (dayDiff <= 2 && dayDiff >= 0) {
          this.notificationService.showNotification(
            `A tarefa '${task.title}' está perto do prazo!`,
            'warning',
            {
              silent: false, 
              link: `/tasks/${task.id}`
            }
          );
          sessionStorage.setItem(notificationKey, 'true');
        }
        // Alerta para tarefas com prazo vencido (vermelho)
        else if (dayDiff < 0) {
          this.notificationService.showNotification(
            `A tarefa '${task.title}' ultrapassou o prazo!`,
            'error',
            {
              silent: false, 
              link: `/tasks/${task.id}` 
            }
          );
          sessionStorage.setItem(notificationKey, 'true');
        }
      }
    });
  }

  getAllFiltered(status: string, sector: string): Observable<Task[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (sector) {
      params = params.set('sector', sector);
    }
    return this.http.get<Task[]>(this.API, { params });
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API}/${task.id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  

}