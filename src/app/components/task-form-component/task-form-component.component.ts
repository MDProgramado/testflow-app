import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core'; // Adicionado 'inject'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../../Services/task-service.service';
import { take } from 'rxjs';
import { AutentificarLoginService } from '../../Services/autentificar-login.service'; // 1. IMPORTAR

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
  currentTaskId: string | null = null; 

  // Injeção de dependências moderna
  private fb: FormBuilder = inject(FormBuilder);
  private taskService: TaskServiceService = inject(TaskServiceService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);
  private authService: AutentificarLoginService = inject(AutentificarLoginService); // 2. INJETAR

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      sector: [{ value: 'Produção', disabled: false }, Validators.required], // Modificado para objeto
      priority: ['Média', Validators.required],
      status: ['Pendente', Validators.required],
      dueDate: ['', Validators.required],
      responsible: ['', Validators.required]
    });

    // 3. LÓGICA PARA TRANCAR O CAMPO 'SECTOR' PARA EDITORES
    this.authService.getCurrentUser().pipe(take(1)).subscribe(user => {
      if (user && user.role === 'editor') {
        const sectorControl = this.form.get('sector');
        // Define o valor do setor do usuário e desabilita o campo
        sectorControl?.setValue(user.sector);
        sectorControl?.disable();
      }
    });

    // O resto do seu ngOnInit continua aqui...
    this.route.paramMap.pipe(
      take(1) 
    ).subscribe(params => {
        // ... (seu código de modo de edição continua igual)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Usamos getRawValue() para obter também os valores de campos desabilitados
    const formData = this.form.getRawValue(); 

    if (this.isEditMode && this.currentTaskId) {
      this.taskService.update(this.currentTaskId, formData).subscribe({
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
      this.taskService.create(formData).subscribe({
        next: () => {
          this.toastr.success('Tarefa criada com sucesso!');
          this.router.navigateByUrl('/tasks');
        },
        error: err => {
          console.error('Erro ao criar tarefa:', err);
          this.toastr.error(`Ocorreu um erro ao criar a tarefa: ${err.message}`);
        }
      });
    }
  }

  public isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}