import { Component } from '@angular/core';
import { HeaderComponentComponent } from "../header-component/header-component.component";

@Component({
  selector: 'app-home-component',
  imports: [HeaderComponentComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
