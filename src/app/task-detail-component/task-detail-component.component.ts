import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskServiceService } from '../Services/task-service.service';
import { Observable, switchMap, take } from 'rxjs';
import { Task } from '../interfaces/Task';
import { ToastrService } from 'ngx-toastr';
import { FooterComponentComponent } from "../footer-component/footer-component.component";
import { HeaderComponentComponent } from "../header-component/header-component.component";


@Component({
  standalone: true,
  selector: 'app-task-detail-component',
  imports: [CommonModule, RouterModule, FooterComponentComponent, HeaderComponentComponent],
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
      return this.taskService.update(task);
    })
  ).subscribe({
    next: () => {
      this.toastr.success('Tarefa concluída com sucesso!');
      this.router.navigateByUrl('/tasks')
    },
    
  })
}

}
