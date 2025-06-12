
import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './login-user-component/login-user-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { TaskFormComponentComponent } from './task-form-component/task-form-component.component';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { TaskDetailComponentComponent } from './task-detail-component/task-detail-component.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PolitcaPrivacidadeComponent } from './LGPD/politca-privacidade/politca-privacidade.component';
import { TermoDeUsoComponent } from './LGPD/termo-de-uso/termo-de-uso.component';
import { ReportComponent } from './report/report.component';

export const routes: Routes = [
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'politicaprivacidade',
    component: PolitcaPrivacidadeComponent
  },
  {
    path: 'termoUso',
    component: TermoDeUsoComponent,
  },
  {
    path: 'login',
    component: LoginUserComponentComponent
  },
  {
    path: 'home',
    component: HomeComponentComponent
  },
  {

    path: 'dashboard',
    component: DashboardComponentComponent
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
    },
  { 
    path: 'tasks/:id', 
    component: TaskDetailComponentComponent 
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: '',
    redirectTo: 'homePage',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'

  },
];
