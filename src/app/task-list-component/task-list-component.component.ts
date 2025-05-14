import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TaskServiceService } from '../Services/task-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-component',
  imports: [CommonModule],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css'
})
export class TaskListComponentComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskServiceService, private router: Router) {}

    ngOnInit(): void {
      this.loadTasks();
    }

    loadTasks(): void {
      this.taskService.getAll().subscribe(resposta => {
        this.tasks = resposta;
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
