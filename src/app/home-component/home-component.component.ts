import { Component } from '@angular/core';

import { TaskListComponentComponent } from "../task-list-component/task-list-component.component";

import { SumaryComponent } from '../sumary/sumary.component';



@Component({
  selector: 'app-home-component',
  imports: [
    TaskListComponentComponent,
    SumaryComponent,

],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  
}
