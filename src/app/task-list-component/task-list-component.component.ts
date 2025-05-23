import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../interfaces/Task';
import { TaskServiceService } from '../Services/task-service.service';
import { HeaderComponentComponent } from "../header-component/header-component.component";
import { FooterComponentComponent } from "../footer-component/footer-component.component";


@Component({
  standalone: true,
  selector: 'app-task-list-component',
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponentComponent, FooterComponentComponent],
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  statusFilter = '';
  sectorFilter = '';
  headerAtivo: Boolean = false;
  constructor(
    private taskService: TaskServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  @Input() exibirHeader = true;
  @Input() exibirFooter = true;

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
      this.statusFilter = params.get('status') || '';
      this.sectorFilter = params.get('sector') || '';
      this.loadTasks();
    });
  }


  loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(t =>
      (!this.statusFilter || t.status === this.statusFilter) &&
      (!this.sectorFilter || t.sector === this.sectorFilter)
    );
  }

  deleteTask(id: string): void {
    if (!confirm('Confirmar exclusão?')) return;
    this.taskService.delete(id).subscribe(() => this.router.navigateByUrl('/home'));
    
  }


  editTask(id: string): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  newTask(): void {
    this.router.navigate(['/tasks/new']);
  }
}
