import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AutentificarLoginService } from '../Services/autentificar-login.service';


export const authGuard: CanActivateFn = (route, state) => {
  // Injetamos nossos serviços
  const authService = inject(AutentificarLoginService);
  const router = inject(Router);

  // Usamos o Observable do nosso serviço para verificar o status do usuário
  return authService.getCurrentUser().pipe(
    take(1), // Pega apenas a primeira emissão para decidir a rota e finaliza o observable.
    map(user => {
      // Se o 'user' NÃO for nulo, significa que o usuário está logado.
      if (user) {
        return true; // Acesso permitido!
      }

      // Se o 'user' for nulo, o usuário NÃO está logado.
      console.log('Acesso negado. Redirecionando para /login');
      router.navigate(['/login']); // Redireciona para a página de login
      return false; // Acesso bloqueado!
    })
  );
};