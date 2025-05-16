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
import { TaskServiceService } from '../Services/task-service.service';
import { Task } from '../interfaces/Task';
import { HeaderComponentComponent } from '../header-component/header-component.component';

@Component({
  standalone: true,
  selector: 'app-task-form-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HeaderComponentComponent
  ],
  templateUrl: './task-form-component.component.html',
  styleUrls: ['./task-form-component.component.css']
})
export class TaskFormComponentComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  private taskId!: string;            

  constructor(
    private fb: FormBuilder,
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title:       ['', Validators.required],
      description: ['', Validators.required],
      sector:      ['Produção', Validators.required],
      priority:    ['Média', Validators.required],
      status:      ['Pendente', Validators.required],
      dueDate:     ['', Validators.required],
      responsible: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {                    
        this.isEdit = true;
        this.taskId = idParam;
        this.taskService.getById(this.taskId).subscribe(task => {
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

    const payload: Task = {
      ...this.form.value,
      id: this.isEdit ? this.taskId : undefined
    };

    const action$ = this.isEdit
      ? this.taskService.update(payload)
      : this.taskService.create(payload);

    action$.subscribe({
      next: () => {
        this.toastr.success(
          this.isEdit
            ? 'Tarefa atualizada com sucesso!'
            : 'Tarefa criada com sucesso!'
        );
        this.router.navigateByUrl('/tasks');
      },
      error: err => {
        console.error('Erro ao salvar tarefa:', err);
        this.toastr.error('Ocorreu um erro ao salvar a tarefa.');
      }
    });
  }
}
