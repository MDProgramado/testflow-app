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
          const active = tasks.filter( task => task.status === 'Em andamento').length;
          const completed = tasks.filter( task => task.status === "Concluída").length;
          
          const overdue = tasks.filter(t => {
            if (!t.dueDate || t.status !== 'Pendente') return false;
            
            const taskDueDate = new Date(t.dueDate);
            taskDueDate.setHours(0, 0, 0, 0); 
            
            return taskDueDate < now;
          }).length;
         
  
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
        }
      )
     }
  }
  