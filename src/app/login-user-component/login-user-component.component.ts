import { Component, OnInit }          from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../interfaces/Usuario';
import { AutentificarLoginService } from '../Services/autentificar-login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
      this.autentificarLogin.BuscarDadosDaAPi(this.formulario.value)
       .subscribe({ 
      next: (usuario) => {       
        console.log('Resposta da API:', usuario);

        if (usuario?.id) {
          this.router.navigateByUrl('/home');
          this.toastr.success('Login realizado com sucesso!');
        } else {
          alert('Usuário inválido');
        }
      },
      error: (err) => {
        console.error('Falha no login:', err);
      }
    });
    }
  }
}
