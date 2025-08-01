import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Observable, switchMap, take } from 'rxjs';
import { Task } from '../../interfaces/Task';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../../Services/task-service.service';



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
      switchMap(params => this.taskService.getById(params.get('id')!))
    );
 }

markComplete(id: string) {
  this.taskService.getById(id).pipe(
    take(1),
    switchMap(task => {
    
      task.status = 'Concluída';
      
     
      return this.taskService.update(task.id!, task); 
    })
  ).subscribe({
    next: (updatedTask) => {
   
   
      this.toastr.success('Tarefa concluída com sucesso!');
      
     
      // this.loadTasks(); 
      this.router.navigateByUrl('/tasks');
    },
    error: (err) => {
      
      console.error('Erro ao atualizar a tarefa:', err);
      this.toastr.error('Ocorreu um erro ao concluir a tarefa.');
    }
  });
}

}
