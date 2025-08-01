import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { TaskServiceService } from '../../Services/task-service.service';
import { ReportService } from '../../Services/report.service';
import { Task } from '../../interfaces/Task';
import { Chart, LinearScale, BarElement, CategoryScale, BarController, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SumaryComponent } from "../../components/sumary/sumary.component";

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, SumaryComponent],
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit, AfterViewInit { 

  tasks:Task[] = [];
  public chart: any;
  public pieChart: any;
  public sectorBarChart: any;
  public sectorPieChart: any;

  statuses = { 'Pendente': 0, 'Em andamento': 0, 'Concluída': 0 };
  statusColors: { [key: string]: { background: string, border: string } } = {
  'Pendente':    { background: 'rgba(214, 0, 0, 1)', border: 'rgba(216, 196, 17, 1)' },   
  'Em andamento':{ background: 'rgba(54, 162, 235, 0.5)', border: 'rgba(54, 162, 235, 1)' },   
  'Concluída':   { background: 'rgba(38, 172, 67, 0.5)', border: 'rgba(75, 192, 192, 1)' }    
};

sectors = { 'Produção': 0, 'Manutenção': 0, "Administrativo": 0 };

  constructor(
    private taskService: TaskServiceService, 
    private reportService: ReportService, 
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.taskService.getAll().subscribe((data) => {
      this.tasks = data;

      if (this.chart && this.pieChart) {
          this.updateChartData();
      }
    });
  }

  ngAfterViewInit() {
    this.createChart();
    this.createPieChart();
     this.createSectorBarChart();
  this.createSectorPieChart();

  this.updateChartData();
  }

  updateChartData() {
    this.statuses = { 'Pendente': 0, 'Em andamento': 0, 'Concluída': 0 };
    this.tasks.forEach((task) => {
      if (task.status === 'Pendente') this.statuses['Pendente']++;
      if (task.status === 'Em andamento') this.statuses['Em andamento']++;
      if (task.status === 'Concluída') this.statuses['Concluída']++;
    });

    const dataValues = [this.statuses['Pendente'], this.statuses['Em andamento'], this.statuses['Concluída']];

    if (this.chart) {
      this.chart.data.datasets[0].data = dataValues;
      this.chart.update();
    }
    if (this.pieChart) {
      this.pieChart.data.datasets[0].data = dataValues;
      this.pieChart.update();
    }

    this.sectors = { 'Produção': 0, 'Manutenção': 0, 'Administrativo': 0 };
  this.tasks.forEach((task) => {
    if (this.sectors[task.sector] !== undefined) {
      this.sectors[task.sector]++;
    }
  });

  const sectorDataValues = Object.values(this.sectors);
  if (this.sectorBarChart) {
    this.sectorBarChart.data.datasets[0].data = sectorDataValues;
    this.sectorBarChart.update();
  }
  if (this.sectorPieChart) {
    this.sectorPieChart.data.datasets[0].data = sectorDataValues;
    this.sectorPieChart.update();
  }
}

  generateReport() {
    const chartImage = this.chart.canvas.toDataURL('image/png');
    if (chartImage) {
      this.reportService.generateTaskReport(this.tasks, chartImage);
    } else {
      this.toastr.error("Não foi possível obter a imagem do gráfico. Gerando relatório sem imagem.");
      this.reportService.generateTaskReport(this.tasks, '');
    }
  }

  createChart() {
  Chart.register(LinearScale, BarElement, CategoryScale, BarController, Title, Tooltip, Legend, ArcElement, PieController);

  const labels = ['Pendente', 'Em andamento', 'Concluída'];

  this.chart = new Chart('canvas', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tarefas por Status',
        data: [],
       
        backgroundColor: labels.map(label => this.statusColors[label].background),
        
        borderColor: labels.map(label => this.statusColors[label].border),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}


  createPieChart() {
  const labels = ['Pendente', 'Em andamento', 'Concluída'];

  this.pieChart = new Chart('pieCanvas', {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: [],
      
        backgroundColor: labels.map(label => this.statusColors[label].background),
        borderColor: labels.map(label => this.statusColors[label].border),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
    }
  });
}
createSectorBarChart() {
  const labels = Object.keys(this.sectors); 

  this.sectorBarChart = new Chart('sectorBarCanvas', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Tarefas por Setor',
        data: [],
        backgroundColor: 'rgba(255, 159, 64, 0.5)', 
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
createSectorPieChart() {
  const labels = Object.keys(this.sectors);

  this.sectorPieChart = new Chart('sectorPieCanvas', { 
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: [],
        backgroundColor: [ 
          'rgba(255, 159, 64, 0.5)', 
          'rgba(75, 192, 192, 0.5)', 
          'rgba(153, 102, 255, 0.5)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
    }
  });
}
}