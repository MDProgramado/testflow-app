import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskServiceService } from '../Services/task-service.service';
import { Observable, switchMap, take } from 'rxjs';
import { Task } from '../interfaces/Task';
import { HeaderComponentComponent } from "../header-component/header-component.component";

@Component({
  standalone: true,
  selector: 'app-task-detail-component',
  imports: [CommonModule, RouterModule, HeaderComponentComponent],
  templateUrl: './task-detail-component.component.html',
  styleUrl: './task-detail-component.component.css'
})
export class TaskDetailComponentComponent implements OnInit{

  task$!: Observable<Task>; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.task$ = this.route.paramMap.pipe(
    switchMap(params => this.taskService.getByid(+params.get('id')!))
  );
 }

 markComplete(id: number) {
  this.taskService.getByid(id).pipe(take(1)).subscribe(task => {
    task.status = "Concluída";
    this.taskService.uptade(task).subscribe( () => 
      this.router.navigate(['tasks']))
  })
 }
}
