import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../interfaces/Task';
import { TaskServiceService } from '../Services/task-service.service';

@Component({
  selector: 'app-report',
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  public completedTasks: Task[] = [];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
      this.taskService.getAll().subscribe(tasks => {
        this.completedTasks = tasks.filter(task => task.status === "Concluída");
      })
  }
}
