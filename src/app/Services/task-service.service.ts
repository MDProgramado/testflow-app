import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, from, map, Observable, tap } from 'rxjs';
import { Task } from '../interfaces/Task';
import { NotificationService } from './notification.service';
import { Firestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, query, where, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private db: Firestore = inject(Firestore);
  private notificationService: NotificationService = inject(NotificationService);

  /**
   * Busca todas as tarefas no Firestore.
   * @returns Um Observable com um array de tarefas.
   */
  getAll(): Observable<Task[]> {
    const tasksRef = collection(this.db, 'tasks');
    return from(getDocs(tasksRef)).pipe(
      map((querySnapshot: QuerySnapshot) => {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
      })
    );
  }

  /**
   * Busca uma tarefa específica pelo seu ID no Firestore.
   * @param id O ID da tarefa a ser buscada.
   * @returns Um Observable com a tarefa encontrada.
   */
  getById(id: string): Observable<Task | null> {
    const taskRef = doc(this.db, `tasks/${id}`);
    return from(getDoc(taskRef)).pipe(
      map((docSnapshot: any) => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() } as Task;
        } else {
          console.error('Tarefa não encontrada');
          return null;
        }
      })
    );
  }

  /**
   * Cria uma nova tarefa no Firestore.
   * @param task A tarefa a ser criada.
   * @returns Um Observable com a tarefa criada.
   */
  create(task: Task): Observable<Task> {
    const taskRef = doc(collection(this.db, 'tasks'));
    return from(setDoc(taskRef, task)).pipe(
      map(() => ({ id: taskRef.id, ...task })),
      tap(() => {
        this.notificationService.showNotification(
          `Tarefa '${task.title}' foi criada com sucesso!`,
          'info',
          {
            link: `/tasks/${task.id}`
          }
        );
      })
    );
  }

  /**
   * Atualiza uma tarefa existente no Firestore.
   * @param id O ID da tarefa a ser atualizada.
   * @param taskData Os dados a serem atualizados.
   * @returns Um Observable com a tarefa atualizada.
   */
  update(id: string, taskData: Partial<Task>): Observable<Task> {
    const taskRef = doc(this.db, `tasks/${id}`);
    return from(updateDoc(taskRef, taskData));
  }

  /**
   * Deleta uma tarefa no Firestore.
   * @param id O ID da tarefa a ser deletada.
   * @returns Um Observable sem valor.
   */
  delete(id: string): Observable<void> {
    const taskRef = doc(this.db, `tasks/${id}`);
    return from(deleteDoc(taskRef));
  }

  /**
   * Verifica as tarefas que estão próximas ou ultrapassaram o prazo e notifica os usuários.
   * @param tasks Lista de tarefas a serem verificadas.
   */
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
        if (dayDiff <= 1 && dayDiff >= 0) {
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

  /**
   * Busca todas as tarefas filtradas por status e setor.
   * @param status O status das tarefas.
   * @param sector O setor das tarefas.
   * @returns Um Observable com as tarefas filtradas.
   */
  getAllFiltered(status: string, sector: string): Observable<Task[]> {
    const tasksRef = collection(this.db, 'tasks');
    const q = query(
      tasksRef,
      where('status', '==', status),
      where('sector', '==', sector)
    );

    return from(getDocs(q)).pipe(
      map((querySnapshot: QuerySnapshot) => {
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
      })
    );
  }
}
