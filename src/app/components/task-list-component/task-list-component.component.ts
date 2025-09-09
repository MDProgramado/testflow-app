import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../interfaces/Task';
import { TaskServiceService } from '../../Services/task-service.service';
import { SumaryComponent } from "../sumary/sumary.component";

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { switchMap, take, throwError } from 'rxjs';




@Component({
  standalone: true,
  selector: 'app-task-list-component',
  imports: [CommonModule, FormsModule, RouterModule, SumaryComponent],
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusFilter = '';
  sectorFilter = '';
  headerAtivo: boolean = false;

  @Input() exibirHeader = true;
  @Input() exibirFooter = true;

  constructor(
    private taskService: TaskServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.statusFilter = params.get('status') || '';
      this.sectorFilter = params.get('sector') || '';
      this.loadTasks(); 
    });
  }

  private loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = this.filterTasks(tasks); 
      this.taskService.checkTaskDeadLines(tasks); 
    });
  }

  private filterTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => {
      const statusMatch = this.statusFilter ? task.status === this.statusFilter : true;
      const sectorMatch = this.sectorFilter ? task.sector === this.sectorFilter : true;
      return statusMatch && sectorMatch;
    });
  }

  public markComplete(id: string): void {
    Swal.fire({
      title: 'Concluir Tarefa?',
      text: "Você deseja marcar esta tarefa como 'Concluída'?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, concluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.completeTask(id);
      }
    });
  }

 private completeTask(id: string): void {
  
  const dataToUpdate: Partial<Task> = { 
    status: 'Concluída' 
  };

  this.taskService.update(id, dataToUpdate).subscribe({
    next: () => {
      this.updateTaskInList(id, dataToUpdate);
      this.toastr.success('Tarefa concluída com sucesso!');
    },
    error: (err) => {
      this.toastr.error('Ocorreu um erro ao concluir a tarefa.');
      console.error(err);
    }
  });
}


private updateTaskInList(id: string, updatedData: Partial<Task>): void {
 
  const index = this.tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    
    this.tasks[index] = { ...this.tasks[index], ...updatedData };
 
    this.filteredTasks = [...this.tasks];
  }
}

  public deleteTask(id: string): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTaskFromService(id);
      }
    });
  }

  private deleteTaskFromService(id: string): void {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.filteredTasks = this.filterTasks(this.tasks); 
        Swal.fire(
          'Excluído!',
          'Sua tarefa foi excluída com sucesso.',
          'success'
        );
      },
      error: (err) => {
        this.toastr.error('Ocorreu um erro ao excluir a tarefa.');
        console.error(err);
      }
    });
  }

  public editTask(id: string, event: MouseEvent): void {
    event.stopPropagation();
    console.log('Botão de editar clicado! ID da tarefa:', id);
    this.router.navigate(['/tasks/edit', id]);
  }

  public newTask(): void {
    this.router.navigate(['/tasks/new']);
  }
}
