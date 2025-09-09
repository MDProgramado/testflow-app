import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../interfaces/UserProfile';
import { AutentificarLoginService } from '../../Services/autentificar-login.service';

@Component({
  standalone: true,
  selector: 'app-login-user-component',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './login-user-component.component.html',
  styleUrls: ['./login-user-component.component.css']
})
export class LoginUserComponentComponent implements OnInit {
  
  formulario!: FormGroup;
  isLoading = false; 

  private fb: FormBuilder = inject(FormBuilder);
  private authService: AutentificarLoginService = inject(AutentificarLoginService); 
  private router: Router = inject(Router);
  private toastr: ToastrService = inject(ToastrService);
  
  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.toastr.warning('Preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true; 
    const { email, senha } = this.formulario.value;

    this.authService.login(email, senha).subscribe({ 
      next: (profile: UserProfile) => {
        // Como o serviço agora garante que profile não é undefined, este código é seguro.
        this.toastr.success(`Bem-vindo, ${profile.displayName || profile.email}!`);

        // A lógica de redirecionamento já está no serviço, mas podemos mantê-la aqui se preferir.
        // A recomendação é manter no serviço para centralizar as regras de negócio.
        // Se a navegação já acontece no serviço, esta parte pode ser removida.
        if (profile.role === 'admin') {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigate(['/tasks']);
        }
      },
      
      error: (err: Error) => {
        // Agora recebemos a mensagem de erro tratada do serviço.
        this.toastr.error(err.message, 'Falha no Login');
        this.isLoading = false; // Importante: parar o loading em caso de erro.
      },
     
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}