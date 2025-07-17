import { Component } from '@angular/core';
import { TaskListComponentComponent } from '../../components/task-list-component/task-list-component.component';
import { SumaryComponent } from '../../components/sumary/sumary.component';






@Component({
  selector: 'app-home-component',
  imports: [
    TaskListComponentComponent,

],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  
}
