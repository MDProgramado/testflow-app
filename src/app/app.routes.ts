import { Routes } from '@angular/router';

// Imports dos seus componentes de página
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
    path: '', // Rota raiz redireciona para a página pública inicial
    redirectTo: 'homePage',
    pathMatch: 'full'
  },

  // ===============================================================
  // ROTAS INTERNAS - Usam o MainLayoutComponent como "casca"
  // Todas as rotas aqui dentro terão o mesmo header, menu e notificador
  // ===============================================================
  {
    path: '',
    component: MainLayoutComponent,
    // futuramente, você pode adicionar um guarda de rota aqui para proteger estas páginas
    // canActivate: [authGuard], 
    children: [
      { path: 'home', component: HomeComponentComponent },
      { path: 'dashboard', component: DashboardComponentComponent },
      { path: 'tasks', component: TaskListComponentComponent },
      { path: 'tasks/new', component: TaskFormComponentComponent },
      { path: 'tasks/edit/:id', component: TaskFormComponentComponent },
      { path: 'tasks/:id', component: TaskDetailComponentComponent },
      { path: 'report', component: ReportComponent },

      // Se o usuário logado tentar acessar um caminho vazio (ex: localhost:4200/), 
      // podemos redirecioná-lo para a home interna.
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // =======================================================
  // ROTA "CATCH-ALL" - Para qualquer URL não encontrada
  // =======================================================
  {
    path: '**',
    redirectTo: 'homePage' // Redireciona para a página pública inicial
  },
];