import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sumary } from '../interfaces/Sumary';
import { TaskServiceService } from '../Services/task-service.service';
import { BaseChartDirective } from 'ng2-charts';

import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponentComponent implements OnInit{

  summaries: Sumary[] = [];
  
  public pieChartLabels: string[] = ['Ativas','Concluídas','Atrasadas'];
  public pieChartDataValues: number[] = [0, 0, 0];
  public pieChartType: ChartType = 'pie';

  
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: this.pieChartLabels,
    datasets: [{ data: this.pieChartDataValues }]
  }

   constructor(private taskService: TaskServiceService) { }

   ngOnInit(): void {
    this.taskService.getAll().subscribe(
      tasks => {
        const now = new Date();
        const active = tasks.filter( task => task.status !== "Concluída").length;
        const completed = tasks.filter( task => task.status === "Concluída").length;
        const overdue = tasks.filter( task => 
        new Date(task.dueDate) < now && task.status !== "Concluída").length;
        
        this.pieChartDataValues = [active, completed, overdue];
        // …e o ChartData correspondente:
        this.pieChartData = {
          labels: this.pieChartLabels,
          datasets: [{ data: this.pieChartDataValues }]
        };

          this.summaries = [
        { label: 'Ativas', count: active, color: 'primary', route: '/tasks?status=Em%20andamento' },
        { label: 'Concluídas', count: completed, color: 'success', route: '/tasks?status=Concluída' },
        { label: 'Atrasadas', count: overdue, color: 'danger', route: '/tasks?status=Pendente' }
      ];
      }
    )
   }
}
