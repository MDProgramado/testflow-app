import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, of, switchMap, catchError, tap } from 'rxjs';
import { Auth, User, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutentificarLoginService {


  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);



  login(email: string, senha: string): Observable<any> {
 
    return from(signInWithEmailAndPassword(this.auth, email, senha)).pipe(
      
      switchMap((userCredential: UserCredential) => {
        return this.checkUserSector(userCredential.user);
      }),
    
      catchError((error) => {
        console.error("Erro de login:", error);
       
        return of({ error: `Erro: ${error.code}` });
      })
    );
  }
  
 
  private checkUserSector(user: User | null): Observable<any> {
    if (!user) {
      return of({ error: 'Usuário não autenticado' });
    }

    const userEmail = user.email;


    if (userEmail === 'solucaofinanceira@gmail.com') {
      return of({ sector: 'solucao financeira', user });
    } else if (userEmail === 'liberdadenews@gmail.com') {
      return of({ sector: 'liberdade news', user });
    } else if (userEmail === 'admin1@gmail.com') {
      return of({ sector: 'admin', user });
    } else {
      
      this.logout(); 
      return of({ error: 'Acesso negado. Este usuário não tem um setor definido.' });
    }
  }

  logout(): Observable<void> {
    
    return from(signOut(this.auth)).pipe(
      tap(() => {
       
        this.router.navigate(['/home']);
      })
    );
  }
}