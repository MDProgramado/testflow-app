import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PolitcaPrivacidadeComponent } from './pages/LGPD/politca-privacidade/politca-privacidade.component';
import { TermoDeUsoComponent } from './pages/LGPD/termo-de-uso/termo-de-uso.component';
import { LoginUserComponentComponent } from './pages/login-user-component/login-user-component.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { DashboardComponentComponent } from './pages/dashboard-component/dashboard-component.component';
import { TaskListComponentComponent } from './components/task-list-component/task-list-component.component';
import { TaskFormComponentComponent } from './components/task-form-component/task-form-component.component';
import { TaskDetailComponentComponent } from './components/task-detail-component/task-detail-component.component';
import { ReportComponent } from './report/report.component';





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
    path: '', 
    redirectTo: 'homePage',
    pathMatch: 'full'
  },


  {
    path: '',
    component: MainLayoutComponent,
 
    children: [
      { path: 'home', component: HomeComponentComponent },
      { path: 'dashboard', component: DashboardComponentComponent },
      { path: 'tasks', component: TaskListComponentComponent },
      { path: 'tasks/new', component: TaskFormComponentComponent },
      { path: 'tasks/edit/:id', component: TaskFormComponentComponent },
      { path: 'tasks/:id', component: TaskDetailComponentComponent },
      { path: 'report', component: ReportComponent },


      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },


  {
    path: '**',
    redirectTo: 'homePage' 
  },
];