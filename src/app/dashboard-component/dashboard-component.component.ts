import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskServiceService } from '../Services/task-service.service';
import { ChartData, ChartType } from 'chart.js';
import { SumaryComponent } from "../sumary/sumary.component";
import { BaseChartDirective } from 'ng2-charts';
import { FooterComponentComponent } from "../footer-component/footer-component.component";
import { HeaderComponentComponent } from "../header-component/header-component.component";


@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, SumaryComponent, BaseChartDirective, FooterComponentComponent, HeaderComponentComponent],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {
 

  public pieChartLabels: string[] = ['Ativas', 'Concluídas', 'Atrasadas'];
  public pieChartData: ChartData<'pie', number[], string> = {
  labels: this.pieChartLabels,
  datasets: [{ data: [1, 2, 3], label: 'Tarefas' }]
};
  public pieChartType: ChartType = 'pie';

  public barChartLabels: string[] = ['Baixa', 'Média', 'Alta'];
  public barChartData: ChartData<'bar', number[], string> = {
    labels: this.barChartLabels,
    datasets: [{ data: [1, 2, 3], label: 'Click nessa barra para filtrar as trarefas por prioridade' }]
  };
  public barChartType: ChartType = 'bar';

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    
    this.taskService.getAll().subscribe(tasks => {
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
      
      this.pieChartData.datasets[0].data = [active, completed, overdue];

      const low = tasks.filter(t => t.priority === 'Baixa').length;
      const mid = tasks.filter(t => t.priority === 'Média').length;
      const high = tasks.filter(t => t.priority === 'Alta').length;
      this.barChartData.datasets[0].data = [low, mid, high];
    });
  }
}
