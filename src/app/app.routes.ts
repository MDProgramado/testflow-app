// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './login-user-component/login-user-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TaskFormComponentComponent } from './task-form-component/task-form-component.component';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginUserComponentComponent },
     {
      path: 'home',
      component: HomeComponentComponent
  },
  { 
    path: '',   
     redirectTo: 'login', 
     pathMatch: 'full' },
  { 
    path: '**',  
    redirectTo: 'login'
  
  },
   { 
      path: 'createTask',   
      component: TaskFormComponentComponent
    },
  
];
