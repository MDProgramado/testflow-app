import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Observable, switchMap, take } from 'rxjs';
import { Task } from '../../interfaces/Task';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../../Services/task-service.service';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  selector: 'app-task-detail-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-detail-component.component.html',
  styleUrls: ['./task-detail-component.component.css']
})
export class TaskDetailComponentComponent implements OnInit{

  task$!: Observable<Task>; 
tasks: Task[] = [];
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

 ngOnInit(): void {
 this.task$ = this.route.paramMap.pipe(
      switchMap(params => this.taskService.getById(params.get('id')!))
    );
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
      
   
      this.taskService.getById(id).pipe(
        take(1), 
        switchMap(task => {
       
          task.status = 'Concluída';
          
      
          return this.taskService.update(id, task); 
        })
      ).subscribe({
        next: (updatedTask) => {
      
          const index = this.tasks.findIndex(t => t.id === id);
          if (index !== -1) {
 
            this.tasks[index] = updatedTask;
        

          }
          
          this.toastr.success('Tarefa concluída com sucesso!');
        },
        error: (err) => {
          this.toastr.error('Ocorreu um erro ao concluir a tarefa.');
          console.error(err);
        }
      });
    }
  });
}


}
