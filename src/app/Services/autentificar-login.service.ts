import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, of, switchMap, catchError, tap, map, shareReplay, throwError } from 'rxjs';
import { Auth, signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword, authState} from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class AutentificarLoginService {  
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  currentUser$: Observable<UserProfile | null> = authState(this.auth).pipe(
    switchMap(user => user ? this.fetchUserProfile(user) : of(null)),
    shareReplay(1)
  );

  getCurrentUser(): Observable<UserProfile | null> {
    return this.currentUser$;
  }

  login(email: string, senha: string): Observable<UserProfile> {
    return from(signInWithEmailAndPassword(this.auth, email, senha)).pipe(
      switchMap(userCredential => this.fetchUserProfile(userCredential.user)),
      
      // SOLUÇÃO DO ERRO 1: Usamos 'map' em vez de 'tap' para a verificação.
      // O 'map' transforma o tipo de Observable<UserProfile | null> para Observable<UserProfile>.
      map(profile => {
        if (!profile) {
          // Se o perfil não existir, lançamos um erro que será pego pelo catchError.
          throw new Error('Perfil de usuário não encontrado no banco de dados.');
        }
        // Se o perfil existir, nós o retornamos. O TypeScript agora sabe que 'null' não é uma opção.
        return profile;
      }),

      tap(() => {
        // Este tap agora recebe com segurança um 'profile' que não é nulo.
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error("Erro no login:", error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          return throwError(() => new Error('Email ou senha inválidos.'));
        }
        return throwError(() => new Error(error.message || 'Ocorreu um erro desconhecido.'));
      })
    );
  }
  
  // SOLUÇÃO DO ERRO 2: A assinatura da função 'register' agora aceita 5 parâmetros.
  // Adicionamos o parâmetro 'role' para que o componente possa passá-lo.
  register(email: string, senha: string, displayName: string, role: 'admin' | 'editor', sector?: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, senha)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        const userProfile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: displayName,
          // Usamos a 'role' recebida como parâmetro.
          role: role, 
          // Se a role for 'admin', o setor é ignorado (undefined).
          sector: role === 'admin' ? undefined : sector
        };
        
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return from(setDoc(userDocRef, userProfile));
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }
  
  private fetchUserProfile(user: User): Observable<UserProfile | null> {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef) as Observable<UserProfile | null>;
  }
}