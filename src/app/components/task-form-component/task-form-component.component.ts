import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../../Services/task-service.service';
import { Task } from '../../interfaces/Task';
import { take } from 'rxjs'; // Importe o operador 'take' do RxJS

@Component({
  standalone: true,
  selector: 'app-task-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './task-form-component.component.html',
  styleUrls: ['./task-form-component.component.css']
})
export class TaskFormComponentComponent implements OnInit {
  
  form!: FormGroup;
  isEditMode = false;
  currentTaskId: string | null = null; // Mais seguro iniciar com null

  constructor(
    private fb: FormBuilder,
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      sector: ['Produção', Validators.required],
      priority: ['Média', Validators.required],
      status: ['Pendente', Validators.required],
      dueDate: ['', Validators.required],
      responsible: ['', Validators.required]
    });

    this.route.paramMap.pipe(
      take(1) 
    ).subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.currentTaskId = idParam;
        
        this.taskService.getById(this.currentTaskId).subscribe(task => {
        
          if (task.dueDate) {
            task.dueDate = new Date(task.dueDate).toISOString().split('T')[0];
          }
          this.form.patchValue(task);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (this.isEditMode && this.currentTaskId) {
  
      this.taskService.update(this.currentTaskId, this.form.value).subscribe({
        next: () => {
          this.toastr.success('Tarefa atualizada com sucesso!');
          this.router.navigateByUrl('/tasks');
        },
        error: err => {
          console.error('Erro ao atualizar tarefa:', err);
          this.toastr.error('Ocorreu um erro ao atualizar a tarefa.');
        }
      });
    } else {
    
      this.taskService.create(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Tarefa criada com sucesso!');
          this.router.navigateByUrl('/tasks');
        },
        error: err => {
          console.error('Erro ao criar tarefa:', err);
          this.toastr.error('Ocorreu um erro ao criar a tarefa.');
        }
      });
    }
  }
  public isInvalid(controlName: string): boolean {
  const control = this.form.get(controlName);
  return control ? control.invalid && (control.dirty || control.touched) : false;
}
}