import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskServiceService } from '../../Services/task-service.service';
import { Sumary } from '../../interfaces/Sumary';


@Component({
  standalone: true,
  selector: 'app-sumary',
  imports: [CommonModule, RouterModule, ],
  templateUrl: './sumary.component.html',
  styleUrl: './sumary.component.css'
})
export class SumaryComponent implements OnInit{
  summaries: Sumary[] = [];
 
  constructor(private taskService: TaskServiceService) { }
  
     ngOnInit(): void {
      this.taskService.getAll().subscribe(
        tasks => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
        let active = 0;
      let completed = 0;
      let overdue = 0;

      
      tasks.forEach(task => {
        if (task.status === 'Em andamento') {
          active++;
        } else if (task.status === 'Concluída') {
          completed++;
        } else if (task.status === 'Pendente' && task.dueDate) {
          const taskDueDate = new Date(task.dueDate);
          taskDueDate.setHours(0, 0, 0, 0); 
          if (taskDueDate < now) {
            overdue++;
          }
        }
      });

      
      this.summaries = [
        {
          label: 'Em Andamento',
          count: active,
          color: 'primary',
          icon: 'bi-arrow-repeat',
          route: '/tasks'
        },
        {
          label: 'Concluídas',
          count: completed,
          color: 'success',
          icon: 'bi-check2-circle',
          route: '/tasks'
        },
        {
          label: 'Pendente',
          count: overdue,
          color: 'danger',
          icon: 'bi-exclamation-circle',
          route: '/tasks'
        }
      ];
    });
  }
}