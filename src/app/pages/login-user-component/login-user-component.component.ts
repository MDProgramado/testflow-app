import { Component, OnInit }          from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private autentificarLogin: AutentificarLoginService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
   
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const { email, senha} = this.formulario.value;

      this.autentificarLogin.login(email, senha)
       .subscribe({ 

      next: (response) => {
          if (response.sector) {
            // Se o login for bem-sucedido, redireciona o usuário com base no setor
            if (response.sector === 'solucao financeira') {
              this.router.navigateByUrl('/home');
            } else if (response.sector === 'liberdade news') {
              this.router.navigateByUrl('/home');
            } else if (response.sector === 'admin') {
              this.router.navigateByUrl('/home');
            }
            this.toastr.success('Login realizado com sucesso!');
          } else {
         
            this.toastr.error('Usuário ou senha inválidos');
          }
        },
        error: (err) => {
          
          console.error('Falha no login:', err);
          this.toastr.error('Erro no login, por favor tente novamente.');
        }
      });
    } else {
      this.toastr.warning('Preencha todos os campos corretamente.');
    }
  }
}
