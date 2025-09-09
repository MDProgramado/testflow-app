import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AutentificarLoginService } from '../Services/autentificar-login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutentificarLoginService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  return authService.getCurrentUser().pipe(
    take(1),
    map(user => {
      if (user && user.role === 'admin') {
        return true; 
      }

      if (user) {
        // CORREÇÃO: A palavra "не" (não em russo) foi trocada por "não".
        toastr.error('Você não tem permissão para acessar esta página.', 'Acesso Negado');
        router.navigate(['/dashboard']); 
        return false;
      }
      
      router.navigate(['/login']);
      return false;
    })
  );
};