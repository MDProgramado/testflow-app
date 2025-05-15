import { Component } from '@angular/core';
import { HeaderComponentComponent } from "../header-component/header-component.component";
import { TaskFormComponentComponent } from "../task-form-component/task-form-component.component";
import { TaskListComponentComponent } from "../task-list-component/task-list-component.component";
import { DashboardComponentComponent } from "../dashboard-component/dashboard-component.component";

@Component({
  selector: 'app-home-component',
  imports: [HeaderComponentComponent, TaskFormComponentComponent, TaskListComponentComponent, DashboardComponentComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
