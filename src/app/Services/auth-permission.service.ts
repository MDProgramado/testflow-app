import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService  implements CanActivate {
  constructor(private auth: Auth, private router: Router, private toastr: ToastrService) {}

  async canActivate(route: any): Promise<boolean> {
    const user = this.auth.currentUser;
    
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const idTokenResult = await user.getIdTokenResult();
    const userSector = idTokenResult.claims['sector'];
    const isAdmin = idTokenResult.claims['admin'];

    const requiredSector = route.data?.sector;

    // Admins têm acesso a tudo
    if (isAdmin) return true;

    // Verificar se o usuário tem o setor necessário
    if (requiredSector && userSector !== requiredSector) {
      this.toastr.error('Acesso não autorizado para este setor.');
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
