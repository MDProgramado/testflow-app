
import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './login-user-component/login-user-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TaskFormComponentComponent } from './task-form-component/task-form-component.component';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';

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
    { 
      path: '', 
      redirectTo: 'tasks', 
      pathMatch: 'full' 
    },
    { 
      path: 'tasks', 
      component: TaskListComponentComponent
    },
    {
       path: 'tasks/new', 
       component: TaskFormComponentComponent
    },
    { 
      path: 'tasks/edit/:id', 
      component: TaskFormComponentComponent
    }
];
