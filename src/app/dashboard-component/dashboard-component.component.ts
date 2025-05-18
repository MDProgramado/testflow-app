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
  public activeCount = 0;
  public completedCount = 0;
  public overdueCount = 0;

  public pieChartLabels: string[] = ['Ativas', 'Concluídas', 'Atrasadas'];
  public pieChartData: ChartData<'pie', number[], string> = {
  labels: ['Ativas', 'Concluídas', 'Atrasadas'],
  datasets: [{ data: [1, 2, 3], label: 'Tarefas' }]
};
  public pieChartType: ChartType = 'pie';

  public barChartLabels: string[] = ['Baixa', 'Média', 'Alta'];
  public barChartData: ChartData<'bar', number[], string> = {
    labels: this.barChartLabels,
    datasets: [{ data: [], label: 'Prioridade' }]
  };
  public barChartType: ChartType = 'bar';

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => {
      const now = new Date();
      this.activeCount = tasks.filter(t => t.status !== "Em andamento").length;
      this.completedCount = tasks.filter(t => t.status === 'Concluída').length;
      this.overdueCount = tasks.filter(t => new Date(t.dueDate) < now && t.status !== "Pendente").length;
      this.pieChartData.datasets[0].data = [this.activeCount, this.completedCount, this.overdueCount];

      const low = tasks.filter(t => t.priority === 'Baixa').length;
      const mid = tasks.filter(t => t.priority === 'Média').length;
      const high = tasks.filter(t => t.priority === 'Alta').length;
      this.barChartData.datasets[0].data = [low, mid, high];
    });
  }
}
