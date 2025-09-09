import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificatonComponent } from '../notificaton/notificaton.component';
import { AutentificarLoginService } from '../../Services/autentificar-login.service'; // 1. Importar o serviço
import { Observable } from 'rxjs';
import { UserProfile } from '../../interfaces/UserProfile';


@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink, NotificatonComponent],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.css'
})
export class HeaderComponentComponent {
private authService = inject(AutentificarLoginService);
  currentUser$: Observable<UserProfile | null> = this.authService.getCurrentUser();

  // 3. Adicionar o método de logout
  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('Logout realizado com sucesso.'),
      error: (err) => console.error('Erro ao fazer logout', err)
    });
  }
}