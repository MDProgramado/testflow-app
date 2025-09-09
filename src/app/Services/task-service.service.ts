import { Injectable, inject } from '@angular/core';
import { Observable, from, of, switchMap, tap, map, catchError, throwError, take } from 'rxjs';
import { Task } from '../interfaces/Task';
import { NotificationService } from './notification.service';
import { Auth, user } from '@angular/fire/auth';


import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from '@angular/fire/firestore';
import { AutentificarLoginService } from './autentificar-login.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService { // Renomeei para TaskService para simplificar

  private firestore: Firestore = inject(Firestore);
  private notificationService: NotificationService = inject(NotificationService);
  private authService: AutentificarLoginService = inject(AutentificarLoginService); // 2. INJETAMOS O AUTHSERVICE

  
  getAll(): Observable<Task[]> {
    // Usamos o authService para pegar o perfil completo do usuário (com a 'role')
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) {
          return of([]); // Retorna array vazio se não estiver logado
        }
        
        const tasksCollection = collection(this.firestore, 'tasks');
        let q; // Nossa variável de query

        // LÓGICA DE PERMISSÕES
        if (user.role === 'admin') {
          // ADMIN: Busca todos os documentos da coleção 'tasks'
          console.log('Usuário é admin. Buscando todas as tarefas.');
          q = query(tasksCollection); 
        } else {
          // EDITOR: Busca apenas onde o campo 'sector' é igual ao setor do usuário
          console.log(`Usuário é editor. Buscando tarefas do setor: ${user.sector}`);
          q = query(tasksCollection, where('sector', '==', user.sector));
        }
        
        // Retornamos os dados e ordenamos no cliente para funcionar no plano Spark
        return (collectionData(q, { idField: 'id' }) as Observable<Task[]>).pipe(
          map(tasks => tasks.sort((a, b) => {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          }))
        );
      })
    );
  }
 
  /**
   * Cria uma nova tarefa, associando-a ao setor do usuário.
   */
 // Dentro de app/Services/task-service.service.ts

// ... (imports e outras funções do serviço)

  /**
   * Cria uma nova tarefa. A lógica muda com base na role do usuário.
   * - Admin: Pode criar tarefa para qualquer setor (usa o valor do formulário).
   * - Editor: Só pode criar tarefa para o seu próprio setor (usa o valor do perfil).
   */
  create(task: Partial<Task>): Observable<string | null> {
    return this.authService.getCurrentUser().pipe(
      take(1), // Pega o primeiro valor e desinscreve, importante para evitar loops.
      switchMap(user => {
        if (!user) {
          throw new Error('Usuário não autenticado para criar tarefa.');
        }
        
        const tasksCollection = collection(this.firestore, 'tasks');
        
        // LÓGICA CORRIGIDA AQUI
        let finalSector: string | undefined;

        if (user.role === 'admin') {
          // Se for admin, o setor vem do formulário que foi preenchido.
          finalSector = task.sector; 
        } else {
          // Se for editor, o setor vem do perfil do usuário, ignorando o que veio do form.
          finalSector = user.sector;
        }

        // Validação para garantir que o setor não seja undefined
        if (!finalSector) {
            throw new Error('O setor da tarefa não foi definido. Administradores devem selecionar um setor no formulário.');
        }

        const taskToCreate = { 
          ...task, 
          userId: user.uid, // Guarda o ID de quem criou a tarefa
          sector: finalSector // Usa o setor final definido pela nossa lógica
        }; 
        
        return from(addDoc(tasksCollection, taskToCreate)); 
      }),
      map(docRef => docRef.id), 
      tap(newId => {
        this.notificationService.showNotification(
          `Tarefa '${task.title}' foi criada com sucesso!`, 'info',
          { link: `/tasks/${newId}` }
        );
      }),
      catchError(err => {
        // Propaga o erro para o componente que chamou.
        console.error("Erro detalhado no serviço de tarefas:", err);
        return throwError(() => new Error(err.message || 'Erro desconhecido ao criar tarefa.'));
      })
    );
  }

// ... (resto do serviço)

  // Os métodos abaixo não precisam de alteração, pois operam em um
  // ID específico, e a segurança deles é garantida pelas Regras do Firestore.
  
  getById(id: string): Observable<Task | null> {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return docData(taskDocRef, { idField: 'id' }) as Observable<Task | null>;
  }

  update(id: string, taskData: Partial<Task>): Observable<void> {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return from(updateDoc(taskDocRef, taskData)).pipe(
      tap(() => {
        this.notificationService.showNotification(`Tarefa atualizada com sucesso!`, 'info');
      })
    );
  }

  delete(id: string): Observable<void> {
    const taskDocRef = doc(this.firestore, `tasks/${id}`);
    return from(deleteDoc(taskDocRef)).pipe(
      tap(() => {
        this.notificationService.showNotification(`Tarefa removida com sucesso.`, 'warning');
      })
    );
  }

  checkTaskDeadLines(tasks: Task[]): void {
    const currentDate = new Date();
    tasks.forEach(task => {
      if (task.status !== "Concluída" && task.id) {
        const deadLineDate = new Date(task.dueDate);
        if (isNaN(deadLineDate.getTime())) return;
        
        const timeDiff = deadLineDate.getTime() - currentDate.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        const notificationKey = `notified_${task.id}`;
        if (sessionStorage.getItem(notificationKey)) return;

        if (dayDiff < 0) {
          this.notificationService.showNotification(
            `A tarefa '${task.title}' ultrapassou o prazo!`, 'error',
            { silent: false, link: `/tasks/${task.id}` }
          );
          sessionStorage.setItem(notificationKey, 'true');
        } else if (dayDiff >= 0 && dayDiff <= 2) {
            this.notificationService.showNotification(
            `A tarefa '${task.title}' está perto do prazo!`, 'warning',
            { silent: false, link: `/tasks/${task.id}` }
          );
            sessionStorage.setItem(notificationKey, 'true');
        }
      }
    });
  }
}