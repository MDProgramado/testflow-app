import { Component, OnInit } from '@angular/core';
import { Sumary } from '../interfaces/Sumary';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskServiceService } from '../Services/task-service.service';

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
          const active = tasks.filter( task => task.status === 'Em andamento').length;
          const completed = tasks.filter( task => task.status === "Concluída").length;
          const overdue = tasks.filter( task => 
          new Date(task.dueDate) < now && task.status === 'Pendente').length;
          
         
  
            this.summaries = [
          { 
            label: 'Em Andamento', 
            count: active, 
            color: 'primary', 
            icon: 'bi-arrow-repeat',
            route: '/tasks?status=Em%20andamento' 
          },

          { 
            label: 'Concluídas', 
            count: completed,
             color: 'success', 
             icon: 'bi-check2-circle',
             route: '/tasks?status=Concluída'
            },
          { 
            label: 'Atrasadas', 
            count: overdue, 
            color: 'warning',
            icon: 'bi-exclamation-circle',
             route: '/tasks?status=Pendente' 
          }
        ];
        }
      )
     }
  }
  