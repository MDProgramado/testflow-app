import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../interfaces/Task';
import { TaskServiceService } from '../../Services/task-service.service';
import { SumaryComponent } from "../sumary/sumary.component";

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';




@Component({
  standalone: true,
  selector: 'app-task-list-component',
  imports: [CommonModule, FormsModule, RouterModule, SumaryComponent],
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
    private route: ActivatedRoute,
    private toastr: ToastrService
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
      this.filteredTasks = tasks;
        this.taskService.checkTaskDeadLines(tasks);
  
    });
  }

public deleteTask(id: string): void {
  Swal.fire({
    title: 'Você tem certeza?',
    text: "Esta ação não poderá ser revertida!",
    icon: 'warning', 
    showCancelButton: true, 
    confirmButtonColor: '#3085d6', 
    cancelButtonColor: '#d33', 
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
 
    if (result.isConfirmed) {
      
      this.taskService.delete(id).subscribe({
        next: () => {
         
          this.tasks = this.tasks.filter(task => task.id !== id);
          
          Swal.fire(
            'Excluído!',
            'Sua tarefa foi excluída com sucesso.',
            'success'
          );

        
    
        },
        error: (err) => {
  
          this.toastr.error('Ocorreu um erro ao excluir a tarefa.');
          console.error(err);
        }
      });
    }
  });
}


editTask(id: string, event: MouseEvent): void {
  // Esta linha é a correção: impede que o clique "vaze" para o card
  event.stopPropagation();
  
  console.log('Botão de editar clicado! ID da tarefa:', id);
  this.router.navigate(['/tasks/edit', id]);
}

  newTask(): void {
    this.router.navigate(['/tasks/new']);
  }
}
