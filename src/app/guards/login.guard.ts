import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AutentificarLoginService } from '../Services/autentificar-login.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutentificarLoginService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user) {
   
        router.navigate(['/dashboard']);
        return false; // Bloqueia o acesso à página de login
      }
      // Se não há usuário, permite o acesso à página de login
      return true; 
    })
  );
};