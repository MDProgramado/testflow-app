import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TaskServiceService } from '../Services/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-list-component',
  imports: [CommonModule, FormsModule,],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css'
})
export class TaskListComponentComponent implements OnInit {
  tasks: Task[] = [];

  filteredTasks: Task[] = []
  statusFilter: string = '';
  sectorFilter: string = '';
  constructor(
    private taskService: TaskServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
        this.statusFilter = params.get('status') || '';
        this.sectorFilter = params.get('sector') || '';
        this.loadTasks();
  });
    }

    loadTasks(): void {
      this.taskService.getAll().subscribe(resposta => {
        this.tasks = resposta;
        this.filterTasks();
      })
    }

    filterTasks(): void {
      this.filteredTasks = this.tasks.filter(task => {
        return (!this.statusFilter || task.status === this.statusFilter) && 
        (!this.sectorFilter || task.sector === this.sectorFilter)
      })
    }

    deleteTask(id: number): void {
      if(confirm(
        'Deseja remove esta tarefa?')){
          this.taskService.delete(id).subscribe(() => {
            this.loadTasks();
          })
      }
    }

    editTask(task: Task): void {
      this.router.navigate(['/tasks/edit', task.id]);
    }

    newTask(): void {
      this.router.navigate(['/tasks/new']);
    }

   
}
