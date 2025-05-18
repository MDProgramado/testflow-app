import { Component, OnInit } from '@angular/core';
import { Sumary } from '../interfaces/Sumary';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { TaskServiceService } from '../Services/task-service.service';

@Component({
  standalone: true,
  selector: 'app-sumary',
  imports: [CommonModule, RouterModule, BaseChartDirective],
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
          const active = tasks.filter( task => task.status !== "Em andamento").length;
          const completed = tasks.filter( task => task.status === "Concluída").length;
          const overdue = tasks.filter( task => 
          new Date(task.dueDate) < now && task.status !== "Pendente").length;
          
         
  
            this.summaries = [
          { label: 'Ativas', count: active, color: 'primary', route: '/tasks?status=Em%20andamento' },
          { label: 'Concluídas', count: completed, color: 'success', route: '/tasks?status=Concluída' },
          { label: 'Atrasadas', count: overdue, color: 'danger', route: '/tasks?status=Pendente' }
        ];
        }
      )
     }
  }
  