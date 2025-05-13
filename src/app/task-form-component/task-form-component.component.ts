import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdicionarServiceService } from '../Services/adicionar-service.service';
import { Task } from '../interfaces/Task';

@Component({
  selector: 'app-task-form-component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form-component.component.html',
  styleUrl: './task-form-component.component.css'
})
export class TaskFormComponentComponent {

task!: Task;
  constructor(private adicionarService: AdicionarServiceService) { }

  adicionarTarefa(task: Task) {
    this.adicionarService.AdicionarTarefa(task).subscribe({
      next: (resposta: Task) => {
        alert('Tarefa adicionada com sucesso');
        console.log(resposta);
      }
    })
  }

}
