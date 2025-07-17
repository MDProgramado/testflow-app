import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Feature } from '../../interfaces/Feature';
import { Testimonial } from '../../interfaces/Testimontial';
import { Plan } from '../../interfaces/Plan';


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  showForm = false;
  Form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.Form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      message: [''],
       acceptTerms: [false, Validators.requiredTrue]
    });
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }

  submit() {
    if (this.Form.valid) {
      console.log('Form data:', this.Form.value);

      this.Form.reset();
      this.showForm = false;
    } else {
      this.Form.markAllAsTouched();
    }
  }


  features: Feature[] = [
    {
      icon: 'project-diagram',
      title: 'Fluxo de Produção Visual',
      description: 'Visualize todo o fluxo de produção em um painel intuitivo...'
    },

  ];

  testimonials: Testimonial[] = [
    {
      stars: 5,
      text: '"O TaskFlow revolucionou nossa linha de produção..."',
      author: 'João Mendes',
      role: 'Gerente de Produção, Indústria A',
      initials: 'JM'
    },
  
  ];

  plans: Plan[] = [
    {
      name: 'Pequenas Linhas',
      price: 'R$299',
      description: 'Ideal para linhas de produção únicas',
      features: ['Até 10 usuários', '1 linha de produção', 'Relatórios básicos'],
      cta: 'Começar'
    },
  
  ];

  @HostListener('click', ['$event'])
  onAnchorClick(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(target.getAttribute('href')!);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}