import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';









export const routes: Routes = [
  // =======================================================
  // ROTAS PÚBLICAS - Usam um layout limpo, sem header
  // =======================================================
  {
    path: 'homePage',
    component: HomePageComponent
  },
  {
    path: 'politicaprivacidade',
    loadComponent: () => import('./pages/LGPD/politca-privacidade/politca-privacidade.component').then(m => m.PolitcaPrivacidadeComponent)
  },
  {
    path: 'termoUso',
    loadComponent: () => import('./pages/LGPD/termo-de-uso/termo-de-uso.component').then(m => m.TermoDeUsoComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-user-component/login-user-component.component').then(m => m.LoginUserComponentComponent)
  },
  {
    path: '', 
    redirectTo: 'homePage',
    pathMatch: 'full'
  },


  {
    path: '',
    component: MainLayoutComponent,
 
    children: [
      { path: 'home', loadComponent: () => import('./pages/home-component/home-component.component').then(m => m.HomeComponentComponent) },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard-component/dashboard-component.component').then(m => m.DashboardComponentComponent) },
      { path: 'tasks', loadComponent: () => import('./components/task-list-component/task-list-component.component').then(m => m.TaskListComponentComponent) },
      { path: 'tasks/new', loadComponent: () => import('./components/task-form-component/task-form-component.component').then(m => m.TaskFormComponentComponent) },
      { path: 'tasks/:id', loadComponent: () => import('./components/task-detail-component/task-detail-component.component').then(m => m.TaskDetailComponentComponent)
      },
 
      


      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },


  {
    path: '**',
    redirectTo: 'homePage' 
  },
];