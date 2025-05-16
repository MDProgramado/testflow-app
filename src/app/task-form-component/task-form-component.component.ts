import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskServiceService } from '../Services/task-service.service';
import { Task } from '../interfaces/Task';
import {  ToastrService } from 'ngx-toastr';
import { HeaderComponentComponent } from "../header-component/header-component.component";




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
  styleUrl: './task-form-component.component.css'
})
export class TaskFormComponentComponent implements OnInit {

    form!: FormGroup;
    isEdit: boolean = false;
    taskId!: number;

    constructor(
      private fb: FormBuilder,
      private taskService: TaskServiceService,
      private route: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService,
    ) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        priority: ['Média', Validators.required],
        status: ['Pendente', Validators.required],
        dueDate: ['', Validators.required],
        responsible: ['', Validators.required]
      });

      const id = this.route.snapshot.paramMap.get('id');
      if(id) {
        this.isEdit = true;
        this.taskId = +id;
        this.taskService.getByid(this.taskId).subscribe(task => {
          this.form.patchValue(task);
        });
      }
    }

    onSubmit(): void {
      if (this.form.invalid) return;

      const task: Task = this.form.value;

      if (this.isEdit) {
        task.id = this.taskId;
        this.taskService.uptade(task).subscribe(() => {
          this.toastr.success('Tarefa atualizada com sucesso!');
          this.router.navigate(['/tasks']);
        });
      } else {
        this.taskService.create(task).subscribe(() => {
          this.toastr.success('Tarefa criada com sucesso!');
          this.router.navigate(['/tasks']);
        });
      }
    }

}
