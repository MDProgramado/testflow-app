import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { map, Observable, switchMap, take } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

 ngOnInit(): void {
  this.task$ = this.route.paramMap.pipe(
    switchMap(params => 
      this.taskService.getById(params.get('id')!).pipe(
        
        map(task => {
          if (task === null) {
            this.toastr.error('Tarefa não encontrada');
            this.router.navigate(['/tasks']); 
            throw new Error('Tarefa não encontrada'); 
          }
          return task; // Retorna a tarefa
        })
      )
    )
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
            if (task) {
              task.status = 'Concluída'; 
              return this.taskService.update(id, task);  
            } else {
              return []; 
            }
          })
        ).subscribe({
          next: () => {
            this.toastr.success('Tarefa concluída com sucesso!');
            this.router.navigateByUrl('/tasks');  
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
