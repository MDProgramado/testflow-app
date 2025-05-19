import { Component } from '@angular/core';
import { HeaderComponentComponent } from "../header-component/header-component.component";
import { TaskListComponentComponent } from "../task-list-component/task-list-component.component";
import { FooterComponentComponent } from "../footer-component/footer-component.component";
import { SumaryComponent } from '../sumary/sumary.component';

@Component({
  selector: 'app-home-component',
  imports: [
    HeaderComponentComponent,
    TaskListComponentComponent, 
    SumaryComponent,
    FooterComponentComponent, ],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

  
}
