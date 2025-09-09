import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { NotificationService } from '../../Services/notification.service';
import { UserProfile } from '../../interfaces/UserProfile';
import { AutentificarLoginService } from '../../Services/autentificar-login.service';

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css'
})
export class UserControlComponent implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AutentificarLoginService);
  private notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  users$!: Observable<UserProfile[]>;
  newUserForm!: FormGroup;
  isCreatingUser = false; // Estado de carregamento para o formulário de criação

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
    
   this.newUserForm = this.fb.group({
  displayName: ['', Validators.required], 
  email: ['', [Validators.required, Validators.email]],
  senha: ['', [Validators.required, Validators.minLength(6)]],
  role: ['editor', Validators.required],
  sector: ['']
});

   
    this.newUserForm.get('role')?.valueChanges.subscribe(role => {
      const sectorControl = this.newUserForm.get('sector');
      if (role === 'admin') {
        sectorControl?.setValue('');
        sectorControl?.disable();
      } else {
        sectorControl?.enable();
      }
    });
  }

 createNewUser(): void {
  if (this.newUserForm.invalid) {
    this.notificationService.showNotification('Por favor, preencha o formulário corretamente.', 'warning');
    return;
  }

  const { email, senha, displayName, role, sector } = this.newUserForm.getRawValue();

  // Validação adicional para editores
  if (role === 'editor' && !sector) {
    this.notificationService.showNotification('Editores devem ter um setor definido.', 'warning');
    return;
  }

  this.isCreatingUser = true;

  this.authService.register(email, senha, displayName, role, sector).subscribe({
    next: () => {
      this.notificationService.showNotification(`Usuário ${displayName} criado com sucesso!`, 'info');
      this.newUserForm.reset({ role: 'editor', sector: '', displayName: '', email: '', senha: '' });
    },
    error: (err: Error) => { 
      const errorMessage = err.message.includes('email-already-in-use')
        ? 'Este email já está em uso.'
        : `Erro ao registrar: ${err.message}`;
      this.notificationService.showNotification(errorMessage, 'error');
    },
    complete: () => {
      this.isCreatingUser = false;
    }
  });
}
 
updateUser(user: UserProfile): void {
  const dataToUpdate: Partial<UserProfile> = {
    role: user.role,
    // CORREÇÃO: Usar 'undefined' quando o setor não se aplica
    sector: user.role === 'admin' ? undefined : user.sector
  };
  
  this.userService.updateUserProfile(user.uid, dataToUpdate).subscribe({
    
    next: () => {
      this.notificationService.showNotification(`Usuário ${user.email} atualizado com sucesso!`, 'info');
    },
    error: (err) => {
      this.notificationService.showNotification(`Erro ao atualizar usuário: ${err.message}`, 'error');
    }
  });
}
}